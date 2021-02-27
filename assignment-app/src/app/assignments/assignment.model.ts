export class Assignment {
  _id?: string;
  id: number;
  nom: string;
  dateDeRendu: Date;
  rendu?: boolean;
  auteur: string;
  matiere:matiere
  note : number;
  remarque: string; 
}

export class matiere{
  nomMatiere: string;
  photoProf: string;
  imgMatiere:string;
}
