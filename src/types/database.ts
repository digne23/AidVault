export interface UserProfile {
  id: string
  email: string
  full_name: string
  created_at: string
}

export interface Vault {
  id: string
  user_id: string
  balance: number
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  user_id: string
  type: 'deposit' | 'withdrawal' | 'donation'
  amount: number
  created_at: string
}

export interface Donation {
  id: string
  user_id: string
  amount: number
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: UserProfile
        Insert: {
          id?: string
          email: string
          full_name: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          created_at?: string
        }
        Relationships: []
      }
      vaults: {
        Row: Vault
        Insert: {
          id?: string
          user_id: string
          balance?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          balance?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: Transaction
        Insert: {
          id?: string
          user_id: string
          type: 'deposit' | 'withdrawal' | 'donation'
          amount: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'deposit' | 'withdrawal' | 'donation'
          amount?: number
          created_at?: string
        }
        Relationships: []
      }
      donations: {
        Row: Donation
        Insert: {
          id?: string
          user_id: string
          amount: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
