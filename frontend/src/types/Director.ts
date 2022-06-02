export interface Director {
  name: string;
  id: number;
}
export interface CreateDirectorDTO {
  name: string;
}

export interface UpdateDirectorDTO extends CreateDirectorDTO {}

export interface UpdateDirectorActionProps {
  body: UpdateDirectorDTO;
  id: number;
}

export interface DirectorInitialState {
  name: string;
}
