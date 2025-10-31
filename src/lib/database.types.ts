export interface Database {
  public: {
    Tables: {
      authors: {
        Row: {
          id: string;
          name: string;
          slug: string;
          bio: string;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          bio?: string;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          bio?: string;
          avatar_url?: string | null;
          created_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string;
          created_at?: string;
        };
      };
      poems: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          excerpt: string;
          author_id: string;
          category_id: string | null;
          featured_image_url: string | null;
          is_featured: boolean;
          published_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content: string;
          excerpt: string;
          author_id: string;
          category_id?: string | null;
          featured_image_url?: string | null;
          is_featured?: boolean;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          content?: string;
          excerpt?: string;
          author_id?: string;
          category_id?: string | null;
          featured_image_url?: string | null;
          is_featured?: boolean;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      tags: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
        };
      };
      poem_tags: {
        Row: {
          poem_id: string;
          tag_id: string;
        };
        Insert: {
          poem_id: string;
          tag_id: string;
        };
        Update: {
          poem_id?: string;
          tag_id?: string;
        };
      };
    };
  };
}

export type Author = Database['public']['Tables']['authors']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Poem = Database['public']['Tables']['poems']['Row'];
export type Tag = Database['public']['Tables']['tags']['Row'];

export interface PoemWithDetails extends Poem {
  author: Author;
  category: Category | null;
}
