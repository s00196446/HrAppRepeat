import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any = {};

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(
      (data: any) => {
        this.profile = data;
      },
      (error: any) => {
        console.error('Error fetching profile', error);
        this.toastr.error('Failed to load profile');
      }
    );
  }

  saveProfile(): void {
    this.authService.updateProfile(this.profile).subscribe(
      () => {
        this.toastr.success('Profile updated successfully');
      },
      (error: any) => {
        console.error('Error updating profile', error);
        this.toastr.error('Failed to update profile');
      }
    );
  }
}
