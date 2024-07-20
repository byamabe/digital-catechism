// types/database.types.ts

export interface Database {
  public: {
    Tables: {
      podcasts: {
        Row: {
          id: string;
          title: string;
          description: string;
          author: string;
          image_url: string;
          rss_feed_url: string;
          website_url: string;
          category_id: string;
        };
        Insert: Omit<Database["public"]["Tables"]["podcasts"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["podcasts"]["Row"]>;
      };
      categories: {
        Row: {
          id: string;
          name: string;
        };
        Insert: Omit<Database["public"]["Tables"]["categories"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["categories"]["Row"]>;
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role: string;
        };
        Insert: Omit<Database["public"]["Tables"]["user_roles"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["user_roles"]["Row"]>;
      };
    };
  };
}
