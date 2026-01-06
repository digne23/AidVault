-- ============================================
-- AidVault Platform Statistics
-- Supabase SQL for aggregated stats
-- Run this in your Supabase SQL Editor
-- ============================================

-- Create a view for platform-wide statistics
-- This aggregates data without exposing individual user information

-- Drop existing view if it exists
DROP VIEW IF EXISTS platform_stats;

-- Create the platform stats view
CREATE VIEW platform_stats AS
SELECT
  -- Total amount donated (all time)
  COALESCE(SUM(d.amount), 0)::numeric AS total_donated,

  -- Total amount currently being saved (across all vaults)
  (SELECT COALESCE(SUM(balance), 0)::numeric FROM vaults) AS total_savings,

  -- Number of active savers (users with vaults)
  (SELECT COUNT(*)::integer FROM vaults) AS active_savers,

  -- Number of completed donations
  COUNT(d.id)::integer AS completed_donations,

  -- Last updated timestamp
  NOW() AS last_updated
FROM donations d;

-- Create a function to get monthly donation totals for the last 12 months
CREATE OR REPLACE FUNCTION get_monthly_donations()
RETURNS TABLE (
  month_year TEXT,
  total_amount NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    TO_CHAR(DATE_TRUNC('month', created_at), 'Mon ''YY') AS month_year,
    COALESCE(SUM(amount), 0)::numeric AS total_amount
  FROM donations
  WHERE created_at >= DATE_TRUNC('month', NOW()) - INTERVAL '11 months'
  GROUP BY DATE_TRUNC('month', created_at)
  ORDER BY DATE_TRUNC('month', created_at);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get cumulative growth data
CREATE OR REPLACE FUNCTION get_growth_data()
RETURNS TABLE (
  month_year TEXT,
  cumulative_donations NUMERIC,
  cumulative_users INTEGER
) AS $$
BEGIN
  RETURN QUERY
  WITH monthly_donations AS (
    SELECT
      DATE_TRUNC('month', created_at) AS month,
      SUM(amount) AS amount
    FROM donations
    WHERE created_at >= DATE_TRUNC('month', NOW()) - INTERVAL '11 months'
    GROUP BY DATE_TRUNC('month', created_at)
  ),
  monthly_users AS (
    SELECT
      DATE_TRUNC('month', created_at) AS month,
      COUNT(*) AS new_users
    FROM vaults
    WHERE created_at >= DATE_TRUNC('month', NOW()) - INTERVAL '11 months'
    GROUP BY DATE_TRUNC('month', created_at)
  ),
  all_months AS (
    SELECT generate_series(
      DATE_TRUNC('month', NOW()) - INTERVAL '11 months',
      DATE_TRUNC('month', NOW()),
      '1 month'::interval
    ) AS month
  )
  SELECT
    TO_CHAR(am.month, 'Mon ''YY') AS month_year,
    COALESCE(SUM(md.amount) OVER (ORDER BY am.month), 0)::numeric AS cumulative_donations,
    COALESCE(SUM(mu.new_users) OVER (ORDER BY am.month), 0)::integer AS cumulative_users
  FROM all_months am
  LEFT JOIN monthly_donations md ON md.month = am.month
  LEFT JOIN monthly_users mu ON mu.month = am.month
  ORDER BY am.month;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get donation distribution by amount ranges
CREATE OR REPLACE FUNCTION get_donation_distribution()
RETURNS TABLE (
  range_label TEXT,
  donation_count INTEGER,
  percentage NUMERIC
) AS $$
DECLARE
  total_count INTEGER;
BEGIN
  -- Get total count first
  SELECT COUNT(*) INTO total_count FROM donations;

  -- Return distribution if there are donations
  IF total_count > 0 THEN
    RETURN QUERY
    SELECT
      range_label,
      COUNT(*)::integer AS donation_count,
      ROUND((COUNT(*)::numeric / total_count * 100), 0)::numeric AS percentage
    FROM (
      SELECT
        CASE
          WHEN amount <= 50 THEN '$1-50'
          WHEN amount <= 100 THEN '$51-100'
          WHEN amount <= 500 THEN '$101-500'
          ELSE '$500+'
        END AS range_label
      FROM donations
    ) ranges
    GROUP BY range_label
    ORDER BY
      CASE range_label
        WHEN '$1-50' THEN 1
        WHEN '$51-100' THEN 2
        WHEN '$101-500' THEN 3
        WHEN '$500+' THEN 4
      END;
  ELSE
    -- Return empty ranges if no donations
    RETURN QUERY
    SELECT '$1-50'::TEXT, 0::INTEGER, 0::NUMERIC
    UNION ALL
    SELECT '$51-100'::TEXT, 0::INTEGER, 0::NUMERIC
    UNION ALL
    SELECT '$101-500'::TEXT, 0::INTEGER, 0::NUMERIC
    UNION ALL
    SELECT '$500+'::TEXT, 0::INTEGER, 0::NUMERIC;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get recent donations (anonymized)
CREATE OR REPLACE FUNCTION get_recent_donations(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  donation_id UUID,
  amount NUMERIC,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    d.id AS donation_id,
    d.amount::numeric,
    d.created_at
  FROM donations d
  ORDER BY d.created_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to authenticated and anonymous users
-- (since this is a public dashboard)
GRANT EXECUTE ON FUNCTION get_monthly_donations() TO anon;
GRANT EXECUTE ON FUNCTION get_monthly_donations() TO authenticated;

GRANT EXECUTE ON FUNCTION get_growth_data() TO anon;
GRANT EXECUTE ON FUNCTION get_growth_data() TO authenticated;

GRANT EXECUTE ON FUNCTION get_donation_distribution() TO anon;
GRANT EXECUTE ON FUNCTION get_donation_distribution() TO authenticated;

GRANT EXECUTE ON FUNCTION get_recent_donations(INTEGER) TO anon;
GRANT EXECUTE ON FUNCTION get_recent_donations(INTEGER) TO authenticated;

-- Grant select on platform_stats view
GRANT SELECT ON platform_stats TO anon;
GRANT SELECT ON platform_stats TO authenticated;

-- ============================================
-- Row Level Security (RLS) Notes:
-- The functions above use SECURITY DEFINER which means they run
-- with the permissions of the function creator (postgres).
-- This allows the functions to aggregate data across all rows
-- without exposing individual user data.
--
-- The functions only return aggregated/anonymized data:
-- - Total amounts (not per-user)
-- - Counts (not individual records)
-- - Donation amounts without user identifiers
-- ============================================

-- Example usage in your application:
--
-- // Get platform stats
-- const { data } = await supabase.from('platform_stats').select('*').single()
--
-- // Get monthly donations
-- const { data } = await supabase.rpc('get_monthly_donations')
--
-- // Get growth data
-- const { data } = await supabase.rpc('get_growth_data')
--
-- // Get donation distribution
-- const { data } = await supabase.rpc('get_donation_distribution')
--
-- // Get recent donations (anonymized)
-- const { data } = await supabase.rpc('get_recent_donations', { limit_count: 10 })
