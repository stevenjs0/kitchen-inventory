export interface Location {
  id: string;
  name: string;
  section: string;
  side?: string;
  position?: string;
  level: string;
  full_path: string;
  created_at: Date;
}

export interface CreateLocationDTO {
  name: string;
  section: string;
  side?: string;
  position?: string;
  level: string;
}

export interface UpdateLocationDTO {
  name?: string;
  section?: string;
  side?: string;
  position?: string;
  level?: string;
}

export interface LocationTree {
  section: string;
  locations: Location[];
}
