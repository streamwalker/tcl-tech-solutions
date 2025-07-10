export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      approval_workflows: {
        Row: {
          assigned_to: string | null
          comments: string | null
          id: string
          post_id: string
          requested_at: string | null
          requested_by: string
          reviewed_at: string | null
          status: string | null
          workspace_id: string
        }
        Insert: {
          assigned_to?: string | null
          comments?: string | null
          id?: string
          post_id: string
          requested_at?: string | null
          requested_by: string
          reviewed_at?: string | null
          status?: string | null
          workspace_id: string
        }
        Update: {
          assigned_to?: string | null
          comments?: string | null
          id?: string
          post_id?: string
          requested_at?: string | null
          requested_by?: string
          reviewed_at?: string | null
          status?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "approval_workflows_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approval_workflows_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      automated_tasks: {
        Row: {
          checklist_item_id: string
          completed_at: string | null
          created_at: string
          error_message: string | null
          execution_results: Json | null
          id: string
          priority: number
          progress_percentage: number | null
          scheduled_for: string | null
          started_at: string | null
          status: string
          task_config: Json | null
          task_description: string | null
          task_name: string
          task_type: string
          updated_at: string
        }
        Insert: {
          checklist_item_id: string
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          execution_results?: Json | null
          id?: string
          priority?: number
          progress_percentage?: number | null
          scheduled_for?: string | null
          started_at?: string | null
          status?: string
          task_config?: Json | null
          task_description?: string | null
          task_name: string
          task_type: string
          updated_at?: string
        }
        Update: {
          checklist_item_id?: string
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          execution_results?: Json | null
          id?: string
          priority?: number
          progress_percentage?: number | null
          scheduled_for?: string | null
          started_at?: string | null
          status?: string
          task_config?: Json | null
          task_description?: string | null
          task_name?: string
          task_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      avatar_configs: {
        Row: {
          created_at: string | null
          emotion_triggers: Json | null
          expressions: Json | null
          id: string
          model: string
          style: string | null
          updated_at: string | null
          user_id: string
          voice_id: string
        }
        Insert: {
          created_at?: string | null
          emotion_triggers?: Json | null
          expressions?: Json | null
          id?: string
          model: string
          style?: string | null
          updated_at?: string | null
          user_id: string
          voice_id: string
        }
        Update: {
          created_at?: string | null
          emotion_triggers?: Json | null
          expressions?: Json | null
          id?: string
          model?: string
          style?: string | null
          updated_at?: string | null
          user_id?: string
          voice_id?: string
        }
        Relationships: []
      }
      checklist_assessments: {
        Row: {
          ai_reasoning: string | null
          ai_score: number | null
          confidence_level: string | null
          created_at: string
          evidence_found: string[] | null
          id: string
          item_id: string
          last_assessed_at: string
          suggested_actions: string[] | null
          updated_at: string
        }
        Insert: {
          ai_reasoning?: string | null
          ai_score?: number | null
          confidence_level?: string | null
          created_at?: string
          evidence_found?: string[] | null
          id?: string
          item_id: string
          last_assessed_at?: string
          suggested_actions?: string[] | null
          updated_at?: string
        }
        Update: {
          ai_reasoning?: string | null
          ai_score?: number | null
          confidence_level?: string | null
          created_at?: string
          evidence_found?: string[] | null
          id?: string
          item_id?: string
          last_assessed_at?: string
          suggested_actions?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      completed_checklist_items: {
        Row: {
          created_at: string
          item_id: string
        }
        Insert: {
          created_at?: string
          item_id: string
        }
        Update: {
          created_at?: string
          item_id?: string
        }
        Relationships: []
      }
      document_scans: {
        Row: {
          checklist_item_id: string
          confidence_score: number | null
          created_at: string
          extracted_evidence: Json | null
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id: string
          scan_results: Json | null
          scan_status: string
          updated_at: string
        }
        Insert: {
          checklist_item_id: string
          confidence_score?: number | null
          created_at?: string
          extracted_evidence?: Json | null
          file_name: string
          file_size: number
          file_type: string
          file_url: string
          id?: string
          scan_results?: Json | null
          scan_status?: string
          updated_at?: string
        }
        Update: {
          checklist_item_id?: string
          confidence_score?: number | null
          created_at?: string
          extracted_evidence?: Json | null
          file_name?: string
          file_size?: number
          file_type?: string
          file_url?: string
          id?: string
          scan_results?: Json | null
          scan_status?: string
          updated_at?: string
        }
        Relationships: []
      }
      integration_monitors: {
        Row: {
          api_endpoint: string | null
          check_frequency: number
          check_results: Json | null
          checklist_item_id: string
          compliance_status: string | null
          created_at: string
          error_message: string | null
          id: string
          integration_name: string
          last_check_at: string | null
          next_check_at: string | null
          provider_type: string
          status: string
          updated_at: string
        }
        Insert: {
          api_endpoint?: string | null
          check_frequency?: number
          check_results?: Json | null
          checklist_item_id: string
          compliance_status?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          integration_name: string
          last_check_at?: string | null
          next_check_at?: string | null
          provider_type: string
          status?: string
          updated_at?: string
        }
        Update: {
          api_endpoint?: string | null
          check_frequency?: number
          check_results?: Json | null
          checklist_item_id?: string
          compliance_status?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          integration_name?: string
          last_check_at?: string | null
          next_check_at?: string | null
          provider_type?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      keycrafter_jobs: {
        Row: {
          app_website: string
          company_name: string
          completed_at: string | null
          created_at: string | null
          current_step: string | null
          error_message: string | null
          id: string
          intervention_data: Json | null
          platform: string
          progress_percentage: number | null
          redirect_uri: string
          requires_intervention: string | null
          screenshot_url: string | null
          status: string
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          app_website: string
          company_name: string
          completed_at?: string | null
          created_at?: string | null
          current_step?: string | null
          error_message?: string | null
          id?: string
          intervention_data?: Json | null
          platform: string
          progress_percentage?: number | null
          redirect_uri: string
          requires_intervention?: string | null
          screenshot_url?: string | null
          status?: string
          updated_at?: string | null
          workspace_id: string
        }
        Update: {
          app_website?: string
          company_name?: string
          completed_at?: string | null
          created_at?: string | null
          current_step?: string | null
          error_message?: string | null
          id?: string
          intervention_data?: Json | null
          platform?: string
          progress_percentage?: number | null
          redirect_uri?: string
          requires_intervention?: string | null
          screenshot_url?: string | null
          status?: string
          updated_at?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "keycrafter_jobs_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      oauth_states: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          platform: Database["public"]["Enums"]["social_platform"]
          redirect_uri: string
          scopes: string[] | null
          state_token: string
          used_at: string | null
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          platform: Database["public"]["Enums"]["social_platform"]
          redirect_uri: string
          scopes?: string[] | null
          state_token: string
          used_at?: string | null
          user_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          platform?: Database["public"]["Enums"]["social_platform"]
          redirect_uri?: string
          scopes?: string[] | null
          state_token?: string
          used_at?: string | null
          user_id?: string
          workspace_id?: string
        }
        Relationships: []
      }
      platform_configs: {
        Row: {
          api_base_url: string
          created_at: string | null
          default_scopes: string[] | null
          id: string
          is_active: boolean | null
          oauth_authorize_url: string
          oauth_token_url: string
          platform: Database["public"]["Enums"]["social_platform"]
          rate_limit_per_hour: number | null
          updated_at: string | null
        }
        Insert: {
          api_base_url: string
          created_at?: string | null
          default_scopes?: string[] | null
          id?: string
          is_active?: boolean | null
          oauth_authorize_url: string
          oauth_token_url: string
          platform: Database["public"]["Enums"]["social_platform"]
          rate_limit_per_hour?: number | null
          updated_at?: string | null
        }
        Update: {
          api_base_url?: string
          created_at?: string | null
          default_scopes?: string[] | null
          id?: string
          is_active?: boolean | null
          oauth_authorize_url?: string
          oauth_token_url?: string
          platform?: Database["public"]["Enums"]["social_platform"]
          rate_limit_per_hour?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      post_analytics: {
        Row: {
          clicks: number | null
          comments: number | null
          engagement_rate: number | null
          external_post_id: string | null
          id: string
          impressions: number | null
          last_updated: string | null
          likes: number | null
          platform: Database["public"]["Enums"]["social_platform"]
          post_id: string
          shares: number | null
        }
        Insert: {
          clicks?: number | null
          comments?: number | null
          engagement_rate?: number | null
          external_post_id?: string | null
          id?: string
          impressions?: number | null
          last_updated?: string | null
          likes?: number | null
          platform: Database["public"]["Enums"]["social_platform"]
          post_id: string
          shares?: number | null
        }
        Update: {
          clicks?: number | null
          comments?: number | null
          engagement_rate?: number | null
          external_post_id?: string | null
          id?: string
          impressions?: number | null
          last_updated?: string | null
          likes?: number | null
          platform?: Database["public"]["Enums"]["social_platform"]
          post_id?: string
          shares?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "post_analytics_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          approval_required: boolean | null
          approved_at: string | null
          approved_by: string | null
          content: string
          created_at: string | null
          created_by: string
          hashtags: string[] | null
          id: string
          is_recurring: boolean | null
          media_urls: string[] | null
          platforms: Database["public"]["Enums"]["social_platform"][] | null
          published_at: string | null
          recurring_schedule: Json | null
          scheduled_for: string | null
          social_account_ids: string[] | null
          status: Database["public"]["Enums"]["post_status"] | null
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          approval_required?: boolean | null
          approved_at?: string | null
          approved_by?: string | null
          content: string
          created_at?: string | null
          created_by: string
          hashtags?: string[] | null
          id?: string
          is_recurring?: boolean | null
          media_urls?: string[] | null
          platforms?: Database["public"]["Enums"]["social_platform"][] | null
          published_at?: string | null
          recurring_schedule?: Json | null
          scheduled_for?: string | null
          social_account_ids?: string[] | null
          status?: Database["public"]["Enums"]["post_status"] | null
          updated_at?: string | null
          workspace_id: string
        }
        Update: {
          approval_required?: boolean | null
          approved_at?: string | null
          approved_by?: string | null
          content?: string
          created_at?: string | null
          created_by?: string
          hashtags?: string[] | null
          id?: string
          is_recurring?: boolean | null
          media_urls?: string[] | null
          platforms?: Database["public"]["Enums"]["social_platform"][] | null
          published_at?: string | null
          recurring_schedule?: Json | null
          scheduled_for?: string | null
          social_account_ids?: string[] | null
          status?: Database["public"]["Enums"]["post_status"] | null
          updated_at?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      social_accounts: {
        Row: {
          account_id: string
          account_name: string
          connected_by: string
          created_at: string | null
          encrypted_access_token: string | null
          encrypted_refresh_token: string | null
          error_message: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          last_sync_at: string | null
          platform: Database["public"]["Enums"]["social_platform"]
          platform_user_id: string | null
          platform_username: string | null
          scopes: string[] | null
          sync_status: string | null
          token_expires_at: string | null
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          account_id: string
          account_name: string
          connected_by: string
          created_at?: string | null
          encrypted_access_token?: string | null
          encrypted_refresh_token?: string | null
          error_message?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          platform: Database["public"]["Enums"]["social_platform"]
          platform_user_id?: string | null
          platform_username?: string | null
          scopes?: string[] | null
          sync_status?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          workspace_id: string
        }
        Update: {
          account_id?: string
          account_name?: string
          connected_by?: string
          created_at?: string | null
          encrypted_access_token?: string | null
          encrypted_refresh_token?: string | null
          error_message?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          platform?: Database["public"]["Enums"]["social_platform"]
          platform_user_id?: string | null
          platform_username?: string | null
          scopes?: string[] | null
          sync_status?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_accounts_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      sync_logs: {
        Row: {
          completed_at: string | null
          error_details: Json | null
          id: string
          next_sync_at: string | null
          records_processed: number | null
          social_account_id: string
          started_at: string | null
          status: string
          sync_type: string
        }
        Insert: {
          completed_at?: string | null
          error_details?: Json | null
          id?: string
          next_sync_at?: string | null
          records_processed?: number | null
          social_account_id: string
          started_at?: string | null
          status: string
          sync_type: string
        }
        Update: {
          completed_at?: string | null
          error_details?: Json | null
          id?: string
          next_sync_at?: string | null
          records_processed?: number | null
          social_account_id?: string
          started_at?: string | null
          status?: string
          sync_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "sync_logs_social_account_id_fkey"
            columns: ["social_account_id"]
            isOneToOne: false
            referencedRelation: "social_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          content: string
          created_at: string | null
          created_by: string
          hashtags: string[] | null
          id: string
          is_public: boolean | null
          name: string
          platforms: Database["public"]["Enums"]["social_platform"][] | null
          updated_at: string | null
          usage_count: number | null
          workspace_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by: string
          hashtags?: string[] | null
          id?: string
          is_public?: boolean | null
          name: string
          platforms?: Database["public"]["Enums"]["social_platform"][] | null
          updated_at?: string | null
          usage_count?: number | null
          workspace_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string
          hashtags?: string[] | null
          id?: string
          is_public?: boolean | null
          name?: string
          platforms?: Database["public"]["Enums"]["social_platform"][] | null
          updated_at?: string | null
          usage_count?: number | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "templates_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_orchestrations: {
        Row: {
          created_at: string
          execution_history: Json | null
          id: string
          last_execution: string | null
          next_execution: string | null
          priority_algorithm: string
          scheduling_rules: Json | null
          status: string
          updated_at: string
          workflow_config: Json
          workflow_description: string | null
          workflow_name: string
        }
        Insert: {
          created_at?: string
          execution_history?: Json | null
          id?: string
          last_execution?: string | null
          next_execution?: string | null
          priority_algorithm?: string
          scheduling_rules?: Json | null
          status?: string
          updated_at?: string
          workflow_config?: Json
          workflow_description?: string | null
          workflow_name: string
        }
        Update: {
          created_at?: string
          execution_history?: Json | null
          id?: string
          last_execution?: string | null
          next_execution?: string | null
          priority_algorithm?: string
          scheduling_rules?: Json | null
          status?: string
          updated_at?: string
          workflow_config?: Json
          workflow_description?: string | null
          workflow_name?: string
        }
        Relationships: []
      }
      workspace_members: {
        Row: {
          id: string
          invited_by: string | null
          joined_at: string | null
          role: Database["public"]["Enums"]["workspace_role"]
          user_id: string
          workspace_id: string
        }
        Insert: {
          id?: string
          invited_by?: string | null
          joined_at?: string | null
          role?: Database["public"]["Enums"]["workspace_role"]
          user_id: string
          workspace_id: string
        }
        Update: {
          id?: string
          invited_by?: string | null
          joined_at?: string | null
          role?: Database["public"]["Enums"]["workspace_role"]
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_members_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          owner_id: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          owner_id: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          owner_id?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_workspace_role: {
        Args: { workspace_id: string; user_id: string }
        Returns: Database["public"]["Enums"]["workspace_role"]
      }
      user_has_workspace_access: {
        Args: { workspace_id: string; user_id: string }
        Returns: boolean
      }
      user_is_workspace_owner: {
        Args: { workspace_id: string; user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      post_status:
        | "draft"
        | "scheduled"
        | "published"
        | "failed"
        | "pending_approval"
      social_platform:
        | "facebook"
        | "instagram"
        | "twitter"
        | "linkedin"
        | "youtube"
        | "tiktok"
      workspace_role: "owner" | "admin" | "editor" | "viewer"
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
    Enums: {
      post_status: [
        "draft",
        "scheduled",
        "published",
        "failed",
        "pending_approval",
      ],
      social_platform: [
        "facebook",
        "instagram",
        "twitter",
        "linkedin",
        "youtube",
        "tiktok",
      ],
      workspace_role: ["owner", "admin", "editor", "viewer"],
    },
  },
} as const
