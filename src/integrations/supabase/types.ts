export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      access_requests: {
        Row: {
          created_at: string | null
          email: string
          id: string
          notes: string | null
          reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          notes?: string | null
          reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          notes?: string | null
          reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      ai_research_history: {
        Row: {
          created_at: string | null
          id: string
          query: string
          response: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          query: string
          response?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          query?: string
          response?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      amenities: {
        Row: {
          additional_fee: number | null
          amenity_type: string
          community_id: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          additional_fee?: number | null
          amenity_type: string
          community_id: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          additional_fee?: number | null
          amenity_type?: string
          community_id?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "amenities_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          details: Json | null
          event_type: string
          id: string
          ip_address: string | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          details?: Json | null
          event_type: string
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          details?: Json | null
          event_type?: string
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      beta_whitelist: {
        Row: {
          created_at: string | null
          email: string
          id: string
          invited: boolean | null
          is_admin_notified: boolean | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          invited?: boolean | null
          is_admin_notified?: boolean | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          invited?: boolean | null
          is_admin_notified?: boolean | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      buying_power_data: {
        Row: {
          calculated: Json | null
          created_at: string | null
          id: string
          inputs: Json
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          calculated?: Json | null
          created_at?: string | null
          id?: string
          inputs?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          calculated?: Json | null
          created_at?: string | null
          id?: string
          inputs?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      communities: {
        Row: {
          city: string | null
          completion_status: string | null
          county: string | null
          created_at: string
          created_by: string | null
          data_quality_score: number | null
          description: string | null
          developer_name: string | null
          email: string | null
          home_count: number | null
          id: string
          last_updated: string | null
          lot_size_range: string | null
          name: string
          phone: string | null
          price_range_max: number | null
          price_range_min: number | null
          source_type: string | null
          source_url: string | null
          square_footage_range: string | null
          state: string | null
          updated_at: string
          website_url: string | null
          year_established: number | null
          zip_code: string | null
        }
        Insert: {
          city?: string | null
          completion_status?: string | null
          county?: string | null
          created_at?: string
          created_by?: string | null
          data_quality_score?: number | null
          description?: string | null
          developer_name?: string | null
          email?: string | null
          home_count?: number | null
          id?: string
          last_updated?: string | null
          lot_size_range?: string | null
          name: string
          phone?: string | null
          price_range_max?: number | null
          price_range_min?: number | null
          source_type?: string | null
          source_url?: string | null
          square_footage_range?: string | null
          state?: string | null
          updated_at?: string
          website_url?: string | null
          year_established?: number | null
          zip_code?: string | null
        }
        Update: {
          city?: string | null
          completion_status?: string | null
          county?: string | null
          created_at?: string
          created_by?: string | null
          data_quality_score?: number | null
          description?: string | null
          developer_name?: string | null
          email?: string | null
          home_count?: number | null
          id?: string
          last_updated?: string | null
          lot_size_range?: string | null
          name?: string
          phone?: string | null
          price_range_max?: number | null
          price_range_min?: number | null
          source_type?: string | null
          source_url?: string | null
          square_footage_range?: string | null
          state?: string | null
          updated_at?: string
          website_url?: string | null
          year_established?: number | null
          zip_code?: string | null
        }
        Relationships: []
      }
      drafts: {
        Row: {
          created_at: string | null
          data: Json | null
          form_slug: string
          id: string
          step: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          form_slug: string
          id?: string
          step?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          form_slug?: string
          id?: string
          step?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      hoa_profiles: {
        Row: {
          amenities_included: string[] | null
          annual_fee: number | null
          community_id: string
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          hoa_name: string | null
          id: string
          initiation_fee: number | null
          management_company: string | null
          monthly_fee: number | null
          restrictions: Json | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          amenities_included?: string[] | null
          annual_fee?: number | null
          community_id: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          hoa_name?: string | null
          id?: string
          initiation_fee?: number | null
          management_company?: string | null
          monthly_fee?: number | null
          restrictions?: Json | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          amenities_included?: string[] | null
          annual_fee?: number | null
          community_id?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          hoa_name?: string | null
          id?: string
          initiation_fee?: number | null
          management_company?: string | null
          monthly_fee?: number | null
          restrictions?: Json | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hoa_profiles_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      scheduled_scraping_jobs: {
        Row: {
          completed_at: string | null
          created_at: string
          created_by: string | null
          cron_schedule: string
          error_message: string | null
          estimated_duration: number | null
          id: string
          isActive: boolean
          job_type: string
          last_run: string | null
          name: string
          next_run: string | null
          priority: string | null
          progress: Json | null
          results: Json | null
          started_at: string | null
          status: string | null
          target_config: Json
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          cron_schedule: string
          error_message?: string | null
          estimated_duration?: number | null
          id?: string
          isActive?: boolean
          job_type: string
          last_run?: string | null
          name: string
          next_run?: string | null
          priority?: string | null
          progress?: Json | null
          results?: Json | null
          started_at?: string | null
          status?: string | null
          target_config?: Json
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          cron_schedule?: string
          error_message?: string | null
          estimated_duration?: number | null
          id?: string
          isActive?: boolean
          job_type?: string
          last_run?: string | null
          name?: string
          next_run?: string | null
          priority?: string | null
          progress?: Json | null
          results?: Json | null
          started_at?: string | null
          status?: string | null
          target_config?: Json
          updated_at?: string
        }
        Relationships: []
      }
      scraping_jobs: {
        Row: {
          completed_at: string | null
          created_at: string
          created_by: string | null
          error_message: string | null
          id: string
          job_type: string
          priority: string
          progress: Json
          results: Json | null
          started_at: string | null
          status: string
          target_config: Json
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          error_message?: string | null
          id?: string
          job_type: string
          priority?: string
          progress?: Json
          results?: Json | null
          started_at?: string | null
          status?: string
          target_config?: Json
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          error_message?: string | null
          id?: string
          job_type?: string
          priority?: string
          progress?: Json
          results?: Json | null
          started_at?: string | null
          status?: string
          target_config?: Json
          updated_at?: string
        }
        Relationships: []
      }
      tax_profiles: {
        Row: {
          assessment_ratio: number | null
          community_id: string
          county_name: string | null
          created_at: string
          disability_exemption: number | null
          homestead_exemption: number | null
          id: string
          last_assessment_year: number | null
          senior_exemption: number | null
          tax_rate: number | null
          updated_at: string
          veteran_exemption: number | null
        }
        Insert: {
          assessment_ratio?: number | null
          community_id: string
          county_name?: string | null
          created_at?: string
          disability_exemption?: number | null
          homestead_exemption?: number | null
          id?: string
          last_assessment_year?: number | null
          senior_exemption?: number | null
          tax_rate?: number | null
          updated_at?: string
          veteran_exemption?: number | null
        }
        Update: {
          assessment_ratio?: number | null
          community_id?: string
          county_name?: string | null
          created_at?: string
          disability_exemption?: number | null
          homestead_exemption?: number | null
          id?: string
          last_assessment_year?: number | null
          senior_exemption?: number | null
          tax_rate?: number | null
          updated_at?: string
          veteran_exemption?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tax_profiles_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      user_page_states: {
        Row: {
          created_at: string
          id: string
          last_modified: string
          route: string
          state_data: Json
          user_id: string
          version: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_modified?: string
          route: string
          state_data?: Json
          user_id: string
          version?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_modified?: string
          route?: string
          state_data?: Json
          user_id?: string
          version?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          role: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_email_whitelist_secure: {
        Args: { check_email: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
