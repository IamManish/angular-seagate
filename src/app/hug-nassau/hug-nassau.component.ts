import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HugService } from '../hug.service';

import {Hospital, Month, Year} from '../hug';

@Component({
  selector: 'app-hug-nassau',
  templateUrl: './hug-nassau.component.html',
  styleUrls: ['./hug-nassau.component.css']
})

export class HugNassauComponent {
  hugForm: FormGroup; // <--- hugForm is of type FormGroup
  hospitals: Hospital[];
  months : Month[];
  years : Year[];
  submitted = false;
  error = false;
  patient_total = 0;
  discharges_total = 0;
  admission_total = 0;
  brain_injury_avg_los     = 0;
  newborn_avg_los     = 0;
  pediatrics_avg_los     = 0;
  physical_rehab_avg_los     = 0;
  psychiatric_avg_los     = 0;
  burn_avg_los     = 0;
  neonatal_avg_los     = 0;
  transition_care_unit_avg_los     = 0;
  chemical_dependency_detox_avg_los     = 0;
  chemical_dependency_rehab_avg_los     = 0;
  medical_surgical_avg_los     = 0;
  ob_gyn_avg_los     = 0;
  occupancy_rate     = 0;
  ambulatory_surgeries_to_inpatient_admission_ratio     = 0;
  admission_from_emergency_to_total_admission_ratio     = 0;
  observation_to_admission_ratio     = 0;
  certified_bed_total     = 0;
  phy_rehab_avg_los     = 0;
  private reportNassauUrl = 'http://seagate.dev/api/hug/nassau'; 


    /*
    selectedHospital:Hospital = new Hospital(2, 'India');
    hospitals = [
       new Hospital(1, 'USA' ),
       new Hospital(2, 'India' ),
       new Hospital(3, 'Australia' ),
       new Hospital(4, 'Brazil')
    ];
  
    people: any[] = [
      {
        "id":1,
        "name": "Douglas  Pace"
      },
      {
          "id":2,
        "name": "Mcleod  Mueller"
      },
    ];
    */
  
  constructor(private fb: FormBuilder, private hugService: HugService, private http: HttpClient) { // <--- inject FormBuilder
    this.createForm();
  }

  ngOnInit() {
    /*
    // Make the HTTP request:
    this.http.get('http://seagate.dev/api/hospitals/2').subscribe(data => {
      // Read the result field from the JSON response.
      console.log(data);    
    });
    */
    
    this.getHospitals();  
    this.getMonths(); 
    this.getYears();  

    this.
      hugForm.
      valueChanges.
      subscribe(form => {
        this.calculatePatientTotal(form);
        this.calculateDischargesTotal(form);
        this.calculateAdmissionTotal(form);
        this.calculateBedsTotal(form);
        this.calculateAvgLos(form);
      });

  }

  getHospitals(): void {
    this.hugService.getHospitals()
        .subscribe(hospitals => this.hospitals = hospitals);
  }

  getMonths(): void {
    this.hugService.getMonths()
        .subscribe(months => this.months = months);
  }

  getYears(): void {
    this.hugService.getYears()
        .subscribe(years => this.years = years);
  }
    
  onSubmitNassau() {
    if (this.hugForm.valid) {
      //console.log(JSON.stringify(this.hugForm.value));
      //this.hugService.saveHugForm(this.hugForm.value);
        
      this.http.post(this.reportNassauUrl, this.hugForm.value, {
            headers: new HttpHeaders().set('Authorization', 'my-auth-token')
      }).subscribe(
            
      );
      this.hugForm.reset();
      this.submitted = true;  
    }
  }

  createForm() {
    this.hugForm = this.fb.group({
      month: ['', Validators.required ],
      year: ['', Validators.required ],
      hospital: ['', Validators.required ],
      beds: this.fb.group({ // <-- the child FormGroup
        beds_brain_injury : ['', Validators.pattern("^[0-9]+$") ],
        beds_newborn   : ['', Validators.pattern("^[0-9]+$") ],
        beds_pediatrics  : ['', Validators.pattern("^[0-9]+$") ],
        beds_psychiatric    : ['', Validators.pattern("^[0-9]+$") ],
        beds_physical_rehab    : ['', Validators.pattern("^[0-9]+$")],
        beds_burn : ['', Validators.pattern("^[0-9]+$")],
        beds_neonatal   : ['', Validators.pattern("^[0-9]+$") ],
        beds_transition_care_unit  : ['', Validators.pattern("^[0-9]+$") ],
        beds_chemical_dependency_detox    : ['', Validators.pattern("^[0-9]+$") ],
        beds_chemical_dependency_rehab : ['', Validators.pattern("^[0-9]+$") ],
        beds_medical_surgical   : ['', Validators.pattern("^[0-9]+$") ],
        beds_ob_gyn  : ['', Validators.pattern("^[0-9]+$") ],
      }),
      patient: this.fb.group({ // <-- the child FormGroup
        patient_brain_injury : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        patient_newborn   : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        patient_pediatrics  : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        patient_psychiatric    : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        patient_physical_rehab    : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        patient_burn : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        patient_neonatal   : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        patient_transition_care_unit  : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        patient_chemical_dependency_detox    : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        patient_chemical_dependency_rehab : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        patient_medical_surgical   : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        patient_ob_gyn  : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        patient_total_month : this.patient_total,
      }),
      discharges: this.fb.group({ // <-- the child FormGroup
        discharges_brain_injury : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        discharges_newborn   : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        discharges_pediatrics  : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        discharges_psychiatric    : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        discharges_physical_rehab    : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        discharges_burn : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        discharges_neonatal   : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        discharges_transition_care_unit  : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        discharges_chemical_dependency_detox    : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        discharges_chemical_dependency_rehab : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        discharges_medical_surgical   : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        discharges_ob_gyn  : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        discharges_total_month   : '',
      }),
      admission: this.fb.group({ // <-- the child FormGroup
        admission_brain_injury : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        admission_newborn   : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        admission_pediatrics  : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        admission_psychiatric    : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        admission_physical_rehab    : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        admission_burn : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        admission_neonatal   : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        admission_transition_care_unit  : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        admission_chemical_dependency_detox    : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        admission_chemical_dependency_rehab : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        admission_ob_gyn  : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        admission_total_month  : '',
      }),
      additional: this.fb.group({ // <-- the child FormGroup
        ambulatory_surgeries : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        emergency_department_visits   : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        observation_patients_total_month  : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        admission_from_emergency    : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
        treat_and_release_from_emergency    : ['', Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$") ],
      }),
      calculation: this.fb.group({ // <-- the child FormGroup
        brain_injury_avg_los    : '',
        newborn_avg_los    : '',
        pediatrics_avg_los    : '',
        physical_rehab_avg_los    : '',
        psychiatric_avg_los    : '',
        burn_avg_los    : '',
        neonatal_avg_los    : '',
        transition_care_unit_avg_los    : '',
        chemical_dependency_detox_avg_los    : '',
        chemical_dependency_rehab_avg_los    : '',
        medical_surgical_avg_los    : '',
        ob_gyn_avg_los    : '',
        occupancy_rate    : '',
        ambulatory_surgeries_to_inpatient_admission_ratio    : '',
        admission_from_emergency_to_total_admission_ratio    : '',
        observation_to_admission_ratio    : '',
        cartified_bed_total    : '',
        phy_rehab_avg_los    : '',
      })
    });
  }

  calculatePatientTotal(form) {
    this.patient_total = Number(form.patient.patient_brain_injury || 0)
                            + Number(form.patient.patient_newborn || 0)
                            + Number(form.patient.patient_pediatrics || 0)
                            + Number(form.patient.patient_psychiatric || 0)
                            + Number(form.patient.patient_physical_rehab || 0)
                            + Number(form.patient.patient_burn || 0)
                            + Number(form.patient.patient_neonatal || 0)
                            + Number(form.patient.patient_transition_care_unit || 0)
                            + Number(form.patient.patient_chemical_dependency_detox || 0)
                            + Number(form.patient.patient_chemical_dependency_rehab || 0)
                            + Number(form.patient.patient_medical_surgical || 0)    
                            + Number(form.patient.patient_ob_gyn || 0)
                            ;
  }

  calculateDischargesTotal(form) {
    this.discharges_total = Number(form.discharges.discharges_brain_injury || 0)
                            + Number(form.discharges.discharges_newborn || 0)
                            + Number(form.discharges.discharges_pediatrics || 0)
                            + Number(form.discharges.discharges_psychiatric || 0)
                            + Number(form.discharges.discharges_physical_rehab || 0)
                            + Number(form.discharges.discharges_burn || 0)
                            + Number(form.discharges.discharges_neonatal || 0)
                            + Number(form.discharges.discharges_transition_care_unit || 0)
                            + Number(form.discharges.discharges_chemical_dependency_detox || 0)
                            + Number(form.discharges.discharges_chemical_dependency_rehab || 0)
                            + Number(form.discharges.discharges_medical_surgical || 0)    
                            + Number(form.discharges.discharges_ob_gyn || 0)
                            ;
  }

  calculateAdmissionTotal(form) {
    this.admission_total = Number(form.admission.admission_brain_injury || 0)
                            + Number(form.admission.admission_newborn || 0)
                            + Number(form.admission.admission_pediatrics || 0)
                            + Number(form.admission.admission_psychiatric || 0)
                            + Number(form.admission.admission_physical_rehab || 0)
                            + Number(form.admission.admission_burn || 0)
                            + Number(form.admission.admission_neonatal || 0)
                            + Number(form.admission.admission_transition_care_unit || 0)
                            + Number(form.admission.admission_chemical_dependency_detox || 0)
                            + Number(form.admission.admission_chemical_dependency_rehab || 0)
                            + Number(form.admission.admission_ob_gyn || 0)
                            ;
  }
  
  calculateAvgLos(form) {
    this.brain_injury_avg_los = Number(form.patient.patient_brain_injury)/Number(form.discharges.discharges_brain_injury);
    this.newborn_avg_los      = Number(form.patient.patient_newborn)/Number(form.discharges.discharges_newborn);
    this.pediatrics_avg_los      = Number(form.patient.patient_pediatrics)/Number(form.discharges.discharges_pediatrics);
    this.physical_rehab_avg_los      = Number(form.patient.patient_psychiatric)/Number(form.discharges.discharges_psychiatric);
    this.psychiatric_avg_los      = Number(form.patient.patient_physical_rehab)/Number(form.discharges.discharges_physical_rehab);
    this.burn_avg_los      = Number(form.patient.patient_burn)/Number(form.discharges.discharges_burn);
    this.neonatal_avg_los      = Number(form.patient.patient_neonatal)/Number(form.discharges.discharges_neonatal);
    this.transition_care_unit_avg_los     = Number(form.patient.patient_transition_care_unit)/Number(form.discharges.discharges_transition_care_unit);
    this.chemical_dependency_detox_avg_los      = Number(form.patient.patient_chemical_dependency_detox)/Number(form.discharges.discharges_chemical_dependency_detox);
    this.chemical_dependency_rehab_avg_los      = Number(form.patient.patient_chemical_dependency_rehab)/Number(form.discharges.discharges_chemical_dependency_rehab);
    this.medical_surgical_avg_los      = Number(form.patient.patient_medical_surgical)/Number(form.discharges.discharges_medical_surgical);
    this.ob_gyn_avg_los      = Number(form.patient.patient_ob_gyn)/Number(form.discharges.discharges_ob_gyn);
    this.occupancy_rate     = 0;
    this.ambulatory_surgeries_to_inpatient_admission_ratio     = Number(form.additional.ambulatory_surgeries)/Number(this.admission_total);
    this.admission_from_emergency_to_total_admission_ratio     = Number(form.additional.emergency_department_visits)/Number(this.admission_total);
    this.observation_to_admission_ratio = Number(form.additional.observation_patients_total_month)/Number(this.admission_total);
  }

  calculateBedsTotal(form) {
    this.certified_bed_total = Number(form.beds.beds_brain_injury || 0)
                            + Number(form.beds.beds_newborn || 0)
                            + Number(form.beds.beds_pediatrics || 0)
                            + Number(form.beds.beds_psychiatric || 0)
                            + Number(form.beds.beds_physical_rehab || 0)
                            + Number(form.beds.beds_burn || 0)
                            + Number(form.beds.beds_neonatal || 0)
                            + Number(form.beds.beds_transition_care_unit || 0)
                            + Number(form.beds.beds_chemical_dependency_detox || 0)
                            + Number(form.beds.beds_chemical_dependency_rehab || 0)
                            + Number(form.beds.beds_medical_surgical || 0)    
                            + Number(form.beds.beds_ob_gyn || 0)
                            ;
  }
}
