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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      academy_certificates: {
        Row: {
          certificate_no: string
          course_slug: string
          final_score: number
          id: string
          issued_at: string
          user_id: string
        }
        Insert: {
          certificate_no?: string
          course_slug: string
          final_score: number
          id?: string
          issued_at?: string
          user_id: string
        }
        Update: {
          certificate_no?: string
          course_slug?: string
          final_score?: number
          id?: string
          issued_at?: string
          user_id?: string
        }
        Relationships: []
      }
      academy_enrollments: {
        Row: {
          completed_at: string | null
          course_slug: string
          enrolled_at: string
          id: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          course_slug: string
          enrolled_at?: string
          id?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          course_slug?: string
          enrolled_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      academy_exam_attempts: {
        Row: {
          answers: Json
          course_slug: string
          id: string
          passed: boolean
          score_pct: number
          started_at: string
          submitted_at: string | null
          user_id: string
        }
        Insert: {
          answers?: Json
          course_slug: string
          id?: string
          passed?: boolean
          score_pct?: number
          started_at?: string
          submitted_at?: string | null
          user_id: string
        }
        Update: {
          answers?: Json
          course_slug?: string
          id?: string
          passed?: boolean
          score_pct?: number
          started_at?: string
          submitted_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      academy_progress: {
        Row: {
          chapter_slug: string
          course_slug: string
          id: string
          last_viewed_at: string
          lesson_slug: string
          status: string
          user_id: string
        }
        Insert: {
          chapter_slug: string
          course_slug: string
          id?: string
          last_viewed_at?: string
          lesson_slug: string
          status?: string
          user_id: string
        }
        Update: {
          chapter_slug?: string
          course_slug?: string
          id?: string
          last_viewed_at?: string
          lesson_slug?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      academy_quiz_attempts: {
        Row: {
          answers: Json
          attempted_at: string
          chapter_slug: string
          course_slug: string
          id: string
          score_pct: number
          user_id: string
        }
        Insert: {
          answers?: Json
          attempted_at?: string
          chapter_slug: string
          course_slug: string
          id?: string
          score_pct?: number
          user_id: string
        }
        Update: {
          answers?: Json
          attempted_at?: string
          chapter_slug?: string
          course_slug?: string
          id?: string
          score_pct?: number
          user_id?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          id: string
          last_contact: string | null
          name: string
          phone: string | null
          project_count: number
          source: string | null
          status: string
          total_revenue: number
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          last_contact?: string | null
          name: string
          phone?: string | null
          project_count?: number
          source?: string | null
          status?: string
          total_revenue?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          last_contact?: string | null
          name?: string
          phone?: string | null
          project_count?: number
          source?: string | null
          status?: string
          total_revenue?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string
          project_type: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone: string
          project_type?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string
          project_type?: string
        }
        Relationships: []
      }
      knowledge_nodes: {
        Row: {
          category: string
          confidence_score: number | null
          content: Json | null
          created_at: string
          id: string
          layer: number
          summary: string | null
          tags: string[] | null
          title: string
        }
        Insert: {
          category: string
          confidence_score?: number | null
          content?: Json | null
          created_at?: string
          id?: string
          layer: number
          summary?: string | null
          tags?: string[] | null
          title: string
        }
        Update: {
          category?: string
          confidence_score?: number | null
          content?: Json | null
          created_at?: string
          id?: string
          layer?: number
          summary?: string | null
          tags?: string[] | null
          title?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          created_at: string
          dealer_cost: number
          description: string | null
          id: string
          manufacturer: string
          model: string
          msrp: number
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          dealer_cost?: number
          description?: string | null
          id?: string
          manufacturer: string
          model: string
          msrp?: number
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          dealer_cost?: number
          description?: string | null
          id?: string
          manufacturer?: string
          model?: string
          msrp?: number
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profit_analyses: {
        Row: {
          amendment_text: string | null
          below_cost_items: Json | null
          contract_value: number
          created_at: string
          findings: Json | null
          high_margin_items: Json | null
          id: string
          labor_billed: number
          labor_breakdown: Json | null
          margin_distribution: Json | null
          product_cost: number
          product_markup: number
          project_title: string
          sales_tax: number
          schedule_a_labor: number
          schedule_a_profit: number
          sw_share_pct: number
          total_hours: number
          updated_at: string
          user_id: string
        }
        Insert: {
          amendment_text?: string | null
          below_cost_items?: Json | null
          contract_value?: number
          created_at?: string
          findings?: Json | null
          high_margin_items?: Json | null
          id?: string
          labor_billed?: number
          labor_breakdown?: Json | null
          margin_distribution?: Json | null
          product_cost?: number
          product_markup?: number
          project_title: string
          sales_tax?: number
          schedule_a_labor?: number
          schedule_a_profit?: number
          sw_share_pct?: number
          total_hours?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          amendment_text?: string | null
          below_cost_items?: Json | null
          contract_value?: number
          created_at?: string
          findings?: Json | null
          high_margin_items?: Json | null
          id?: string
          labor_billed?: number
          labor_breakdown?: Json | null
          margin_distribution?: Json | null
          product_cost?: number
          product_markup?: number
          project_title?: string
          sales_tax?: number
          schedule_a_labor?: number
          schedule_a_profit?: number
          sw_share_pct?: number
          total_hours?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      project_tasks: {
        Row: {
          created_at: string
          done: boolean
          id: string
          name: string
          project_id: string
          sort_order: number
          user_id: string
        }
        Insert: {
          created_at?: string
          done?: boolean
          id?: string
          name: string
          project_id: string
          sort_order?: number
          user_id: string
        }
        Update: {
          created_at?: string
          done?: boolean
          id?: string
          name?: string
          project_id?: string
          sort_order?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          budget: number
          client_id: string | null
          created_at: string
          end_date: string | null
          id: string
          progress: number
          proposal_id: string | null
          spent: number
          start_date: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          budget?: number
          client_id?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          progress?: number
          proposal_id?: string | null
          spent?: number
          start_date?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          budget?: number
          client_id?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          progress?: number
          proposal_id?: string | null
          spent?: number
          start_date?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      proposal_items: {
        Row: {
          created_at: string
          id: string
          product_name: string
          proposal_id: string
          qty: number
          room: string | null
          unit_price: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_name: string
          proposal_id: string
          qty?: number
          room?: string | null
          unit_price?: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_name?: string
          proposal_id?: string
          qty?: number
          room?: string | null
          unit_price?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "proposal_items_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      proposals: {
        Row: {
          client_id: string | null
          created_at: string
          id: string
          labor_hours: number
          labor_rate: number
          notes: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          id?: string
          labor_hours?: number
          labor_rate?: number
          notes?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          id?: string
          labor_hours?: number
          labor_rate?: number
          notes?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "proposals_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      service_order_checklist: {
        Row: {
          created_at: string
          done: boolean
          id: string
          item: string
          service_order_id: string
          sort_order: number
          user_id: string
        }
        Insert: {
          created_at?: string
          done?: boolean
          id?: string
          item: string
          service_order_id: string
          sort_order?: number
          user_id: string
        }
        Update: {
          created_at?: string
          done?: boolean
          id?: string
          item?: string
          service_order_id?: string
          sort_order?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_order_checklist_service_order_id_fkey"
            columns: ["service_order_id"]
            isOneToOne: false
            referencedRelation: "service_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      service_orders: {
        Row: {
          client_id: string | null
          created_at: string
          description: string | null
          id: string
          priority: string
          scheduled_for: string | null
          status: string
          technician: string | null
          time_spent: number
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          priority?: string
          scheduled_for?: string | null
          status?: string
          technician?: string | null
          time_spent?: number
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          priority?: string
          scheduled_for?: string | null
          status?: string
          technician?: string | null
          time_spent?: number
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_orders_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      user_consents: {
        Row: {
          accepted_at: string
          consent_type: string
          id: string
          user_id: string
        }
        Insert: {
          accepted_at?: string
          consent_type: string
          id?: string
          user_id: string
        }
        Update: {
          accepted_at?: string
          consent_type?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      issue_certificate_if_passed: {
        Args: { _course_slug: string }
        Returns: {
          certificate_no: string
          course_slug: string
          final_score: number
          id: string
          issued_at: string
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "academy_certificates"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
