import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Matiere }  from '../matiere.model';


@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // pour le formulaire
  
  nomDevoir = '';
  nomEleve = '';
  dateDeRendu: Date = null;
  nomMatiere = '';
  image ='' ;
  nomP='';
  photo = '';
  note: number = 0;
  remarque = '';

  
  
   matieres: Matiere[] = [
    {nomMatiere: 'oracle', imgMatiere: 'assets/images/oracle.png', nomProf: 'Mopolo', photoProf: 'assets/images/oracle.png'},
    {nomMatiere: 'Angular', imgMatiere: 'assets/images/angular.png', nomProf: 'Buffa', photoProf: 'assets/images/angular.png'},
    {nomMatiere: 'Grails', imgMatiere: 'assets/images/grails.png', nomProf: 'Galli', photoProf: 'assets/images/grails.png'},
    {nomMatiere: 'java', imgMatiere: 'assets/images/java.png', nomProf: 'Amos', photoProf: 'assets/images/java.png'},
    {nomMatiere: 'Docker', imgMatiere: 'assets/images/docker.png', nomProf: 'Kamagate', photoProf: 'assets/images/java.png'},
    {nomMatiere: 'Andoid', imgMatiere: 'assets/images/android.png', nomProf: 'Amos', photoProf: 'assets/images/java.png'},
    {nomMatiere: 'R', imgMatiere: 'assets/images/R.png', nomProf: 'Alison', photoProf: 'assets/images/java.png'},
  ];

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(event) {
    // evite la soumission standard du formulaire, qui génère un warning
    // dans la console...
    event.preventDefault();
    
    console.log(
      'Dans submit nom = ' + this.nomDevoir + ' date = ' + this.dateDeRendu + ' eleve = ' + this.nomEleve
      + ' matiere = ' + this.nomMatiere
      + ' note = ' + this.note
    );

    
    let newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random() * 1000000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    newAssignment.auteur = this.nomEleve;
    this.matieres.forEach(a => {
      if(a.nomMatiere == this.nomMatiere)
      {
        newAssignment.nomMatiere=a.nomMatiere;
        newAssignment.imgMatiere= a.imgMatiere;
        newAssignment.nomProf=a.nomProf;
        newAssignment.photoProf=a.photoProf;

      }
    });
    newAssignment.note=this.note;
    newAssignment.remarque=this.remarque;

    // on va utiliser directement le service
    this.assignmentsService
      .addAssignment(newAssignment)
      .subscribe((reponse) => {
        console.log(reponse.message);

        // il va falloir naviguer de nouveau vers la page d'accueil
        // on va devoir faire l'équivalent du routerLink="/home" mais
        // par programme...
        // on retourne à la page d'accueil
        this.router.navigate(['/affiche']);
      });
  }
}
