export interface Genre {
  name: string;
  id: number;
}
export interface CreateGenreDTO {
  name: string;
}

export interface UpdateGenreDTO extends CreateGenreDTO {}

export interface UpdateGenreActionProps {
  body: UpdateGenreDTO;
  id: number;
}

export interface GenreInitialState {
  name: string;
}
