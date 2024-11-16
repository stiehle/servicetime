export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      field_of_application: {
        Row: {
          id: number
          type: string | null
        }
        Insert: {
          id?: number
          type?: string | null
        }
        Update: {
          id?: number
          type?: string | null
        }
        Relationships: []
      }
      service_block: {
        Row: {
          action: string | null
          appendix_no: string | null
          communication: string | null
          created_at: string
          customer: string | null
          date_of_action: string | null
          duration: number | null
          id: number
          location: string | null
          note: string | null
          priority: string | null
          status: string | null
          technician: string | null
          time_of_action: string | null
          time_period_of: string | null
          time_period_util: string | null
        }
        Insert: {
          action?: string | null
          appendix_no?: string | null
          communication?: string | null
          created_at?: string
          customer?: string | null
          date_of_action?: string | null
          duration?: number | null
          id?: number
          location?: string | null
          note?: string | null
          priority?: string | null
          status?: string | null
          technician?: string | null
          time_of_action?: string | null
          time_period_of?: string | null
          time_period_util?: string | null
        }
        Update: {
          action?: string | null
          appendix_no?: string | null
          communication?: string | null
          created_at?: string
          customer?: string | null
          date_of_action?: string | null
          duration?: number | null
          id?: number
          location?: string | null
          note?: string | null
          priority?: string | null
          status?: string | null
          technician?: string | null
          time_of_action?: string | null
          time_period_of?: string | null
          time_period_util?: string | null
        }
        Relationships: []
      }
      service_technician: {
        Row: {
          first_name: string
          id: number
          last_name: string
          personal_nr: number
        }
        Insert: {
          first_name: string
          id?: number
          last_name: string
          personal_nr: number
        }
        Update: {
          first_name?: string
          id?: number
          last_name?: string
          personal_nr?: number
        }
        Relationships: []
      }
      technician_field_of_app: {
        Row: {
          field_of_app: number
          note: string | null
          technician: number
        }
        Insert: {
          field_of_app?: number
          note?: string | null
          technician: number
        }
        Update: {
          field_of_app?: number
          note?: string | null
          technician?: number
        }
        Relationships: [
          {
            foreignKeyName: "technician_field_of_app_field_of_app_fkey"
            columns: ["field_of_app"]
            isOneToOne: false
            referencedRelation: "field_of_application"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "technician_field_of_app_technician_fkey"
            columns: ["technician"]
            isOneToOne: false
            referencedRelation: "service_technician"
            referencedColumns: ["id"]
          },
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
