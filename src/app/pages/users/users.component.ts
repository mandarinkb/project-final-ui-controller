import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'src/app/shared/dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { UsersService } from 'src/app/shared/users/users.service';
import { NgForm } from '@angular/forms';
import { Users } from 'src/app/shared/users/users.model';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'src/app/shared/response.model';
import { LoginService } from 'src/app/shared/login.service';
import { AuthenService } from 'src/app/shared/authen.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  swPassword = false;
  dbId: string;
  dbRole: string;
  dbUserName: string;
  collapedSideBar: boolean;
  displayedColumns: string[] = ['username', 'role', 'action'];
  dataSource = new MatTableDataSource<Users>();
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(public service: UsersService,
    private dialogService: DialogService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public login: LoginService,
    private auth: AuthenService) { }

  ngOnInit() {
    this.login.checkAdmin();
    this.dataSource = new MatTableDataSource<Users>(this.service.listUsers);  //  set datasource
    this.dataSource.paginator = this.paginator;  // set pagination
    this.resetForm();
    this.checkRole();
    this.dbUserName = this.auth.getUsername(); // เก็บ username
    this.dbId = this.auth.getId(); // เก็บ id
  }
  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    // clear form
    this.service.formUsersData = {
      userId: null,
      username: '',
      password: '',
      role: '',
      newPassword: '',
      confirmNewPassword: ''
    };
  }

  async checkRole() {
      // กรณีเป็น  admin
      if (this.login.isAdmin) {
        await this.readUsers();
      } else {
        await this.readUserId(this.auth.getId());
      }
  }

  readUsers() {
    this.service.readUsers().subscribe((res: Users[]) => {
      this.service.listUsers = res;
      this.dataSource = new MatTableDataSource<Users>(this.service.listUsers);
      this.dataSource.paginator = this.paginator;
    }, err => {

    });
  }

  // for role user
  readUserId(id) {
    this.service.readUserId(id).subscribe((res: Users[]) => {
      this.service.listUsers = res;
      this.dataSource = new MatTableDataSource<Users>(this.service.listUsers);  //  set datasource
      this.dataSource.paginator = this.paginator;  // set pagination
    }, err => {

    });
  }

  saveUsers(form: NgForm) {
    this.service.saveUsers(form).subscribe((res: Response) => {
      this.toastr.success('', 'Create user success.');
      this.checkRole();
    }, err => {

    });
  }

  deleteUsers(id) {
    this.service.deleteUsers(id).subscribe((res: Response) => {
      this.toastr.success('', 'Delete user success.');
      this.checkRole();
    }, err => {

    });
  }
  readUsersById(id) {
    this.swPassword = false; // clear show password component
    this.service.readUsersById(id).subscribe((res: Users) => {
      this.dbRole = res.role;
      this.service.formUsersData = res;
      this.service.formUsersData.password = ''; // clear password
    }, err => {

    });
  }

  updateUsers(id, form: NgForm) {
    this.service.updateUsers(id, form).subscribe((res: Response) => {
      if (res.status === 200) {
        this.toastr.success('', 'Update user success.');
      } else {
        this.toastr.error('', 'Incorrect password.');
      }
      this.checkRole();
    }, err => {

    });
  }
  onDelete(id) {
    this.dialogService
      .confirm(
        'ยืนยันการลบรายการ..',
        'ต้องการลบรายการหรือไม่ ?'
      )
      .then(confirmed => {  // กดok => confirmed = true , กดcancel => confirmed = false
        if (confirmed) {
          this.deleteUsers(id);
        } else {
          // กรณี cancel ลบ
          console.log('cancel');
        }
      })
      .catch(() =>
        // กรณี ปิด confirmed modal ด้วยวิธีอื่นๆ
        console.log('exit')
      );
  }
  // modal
  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  openBackDropCustomClass(content) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  onSubmit(form: NgForm) {
    if (form.value.userId == null) {
      this.saveUsers(form.value);
    } else {
      this.updateUsers(form.value.userId, form.value);
      // กรณีมีการเปลี่ยนชื่อ username ของตัวเองใหม่ให้ login อีกรอบ
      if (this.dbUserName !== form.value.username && Number(this.dbId) === form.value.userId) {
        this.login.logOut();
      }
    }
    this.swPassword = false; // clear show password component
  }

  switchPasswordComponent() {
    if (this.swPassword) {
      this.swPassword = false;
    } else {
      this.swPassword = true;
    }
  }

}
