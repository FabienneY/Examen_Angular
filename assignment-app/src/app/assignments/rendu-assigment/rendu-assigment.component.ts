



import { Component, OnInit} from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Matiere } from '../matiere.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';



/*import { AssignmentsService } from '.../shared/assignments.service';
import { Assignment } from './assignment.model';
import { Matiere } from './matiere.model'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '.../shared/auth.service';*/



@Component({
  selector: 'app-rendu-assigment',
  templateUrl: './rendu-assigment.component.html',
  styleUrls: ['./rendu-assigment.component.css']
})
export class RenduAssigmentComponent implements OnInit {

  assignmentSelectionne: Assignment;
  assignments: Assignment[] ;
  matieres:Matiere[];
  ListRendu: [];
  nomEleve: string;
  id: number;
  assignment: Assignment;
  
  
  constructor(private assignmentService: AssignmentsService, private router: Router, private route: ActivatedRoute, private authService:AuthService) {}
  
  listRendu(){
    this.assignmentService
          .getAssignments()
            .subscribe((assignments) => {
              assignments.forEach(a =>{
                if(a.rendu==true){
                  this.assignments.push(a);
                  console.log(this.assignments)
                }
                
              });
              

              
          } );
  }
  

  ngOnInit(): void {
    console.log('Demande des assignments via le service...');
    this.assignmentService.getAssignments().subscribe((assignements) => {
      this.assignments = assignements;
      console.log('Données reçues...');
    });
    console.log('getAssignments appelé....');
  }

  afficherendu(): void {
    console.log('Demande des assignments via le service...');
    this.assignmentService.getAssignments().subscribe((assignements) => {
      this.assignments = assignements;
      console.log('Données reçues...');
    });
    console.log('getAssignments appelé....');
  }

  assignmentClique(a: Assignment) {
    console.log('Assignment cliqué : ' + a.nom);
    this.assignmentSelectionne = a;
  }

  onNouvelAssignment(newAssignment: Assignment) {
    this.assignmentService.addAssignment(newAssignment).subscribe((message) => {
      console.log(message);
    });
    // et on cache le formulaire et on réaffiche la liste à jour
    //this.formVisible = false
  }

  onDelete() {
    this.assignmentService
      .deleteAssignment(this.assignmentSelectionne)
      .subscribe((reponse) => {
        console.log(reponse.message);
        this.assignmentSelectionne = null;

        // on retourne à la page d'accueil
        this.router.navigate(['/affiche']);
      });
  }

  sedeconnecter(){
    this.authService.deconnecte().subscribe(result=>{
        if(result.auth==false){
          this.router.navigate(['/home']);
          console.log('Vous êtes deconnecté');
        }
    });
    
  }

  isConnect():boolean {
    return this.authService.estconnecte;
  }

  rechercher(nom) {
    // evite la soumission standard du formulaire, qui génère un warning
    // dans la console...
    nom.preventDefault();
    id: Number;
    
    console.log(
      'Dans recherche nom = ' + this.nomEleve
    );

    // on va utiliser directement le service
    this.assignmentService.getAssignmentEleve(this.id,nom).subscribe((assignment) =>{
      
        this.router.navigate(['/affiche']);
      });
  }

}



