import { Component, OnInit, Input } from '@angular/core';
import { AuthenService } from 'src/app/shared/authen.service';
import { ShareFileMemberService } from 'src/app/shared/share-file/share-file-member.service';
import { ShareFileMember } from 'src/app/shared/share-file/share-file-member.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FolderService } from 'src/app/shared/folder.service';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/shared/dialog.service';
import { FileService } from 'src/app/shared/file.service';
import { RedirectLoginService } from 'src/app/shared/redirect-login.service';
import { NgForm } from '@angular/forms';
import { MyFileMainFolder } from 'src/app/shared/my-file-main-folder.model';
import { MyFileSubFolder } from 'src/app/shared/my-file-sub-folder.model';
import { Folder } from 'src/app/shared/folder.model';
import { Subfolder } from 'src/app/shared/subfolder.model';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ShareFileMemberActivity } from 'src/app/shared/share-file/share-file-member-activity.model';

@Component({
  selector: 'app-share-file',
  templateUrl: './share-file.component.html',
  styleUrls: ['./share-file.component.scss']
})
export class ShareFileComponent implements OnInit {
  @Input() departmentName: string;
  isActiveDepartment: boolean; // สมาชิก
  isActiveShareFile: boolean; // ไฟล์ที่ใช้ร่วมกัน
  collapedSideBar: boolean;
  //pgDepartmentMember = 1;
  //pgDepartmentActivity = 1;

 
  constructor(private serviceShareFileMember: ShareFileMemberService,
              private authen: AuthenService ,
              private modalService: NgbModal,
              // private service: FolderService,
              private toastr: ToastrService,
              private dialogService: DialogService,
              // private serviceFile: FileService,
              private redirect: RedirectLoginService) { }

  ngOnInit() {
    this.isActiveDepartment = true; // สมาชิก
    this.isActiveShareFile = false; // ไฟล์ที่ใช้ร่วมกัน

    // tslint:disable-next-line:radix
    //this.departmentId = parseInt(this.authen.getDepartmentId()); // set department id จาก session storage
    //this.readDepartment(this.departmentId);
    //this.readDepartmentActivity(this.departmentId);
    /////
    // tslint:disable-next-line:radix
 
    this.departmentName = this.authen.getDepartmentName();

  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

}
