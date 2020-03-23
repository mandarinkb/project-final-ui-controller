import { Component, OnInit } from '@angular/core';
import { AuthenService } from 'src/app/shared/authen.service';
import { ShareFileMemberService } from 'src/app/shared/share-file/share-file-member.service';
import { ShareFileMember } from 'src/app/shared/share-file/share-file-member.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FolderService } from 'src/app/shared/folder.service';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/shared/dialog.service';
import { FileService } from 'src/app/shared/file.service';
import { RedirectLoginService } from 'src/app/shared/redirect-login.service';

@Component({
  selector: 'app-share-file',
  templateUrl: './share-file.component.html',
  styleUrls: ['./share-file.component.scss']
})
export class ShareFileComponent implements OnInit {
  isActiveDepartment: boolean; // สมาชิก
  isActiveShareFile: boolean; // ไฟล์ที่ใช้ร่วมกัน
  collapedSideBar: boolean;
  pgDepartment = 1;

  departmentId: number; // id หน่วยงาน


  memberId: number;

  deleteId: number;
  listChooseCheckBox: Array<number> = [];
  listCheckBoxName: Array<string> = [];
  listCheckBoxType: Array<string> = [];
  choose = 0;
  unChoose = 0;

  disableSelectedButton = true;
  disableBackButton = true;

  swEditMenu: boolean; // dropdown แก้ไข เมนู

  swMainFolderElement: boolean; // table
  swSubFolderElement: boolean;
  swFileElement: boolean;

  swCreateMainFolderButton: boolean; // ปุ่มสร้างโฟลเดอร์
  swCreateSubFolderButton: boolean;

  swSelectMainFolderButton: boolean; // ปุ่มรายการที่เลือก
  swSelectSubFolderButton: boolean;
  swSelectFileButton: boolean;

  mainFolderId: number;
  valueMainFolderId: number;

  subFolderId: number;

  // file
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  swDownload: boolean;
  fileId: number;
  fileName: string;

  swDeleteFolder: boolean;
  swDeleteFile: boolean;

  swMainFolderUploadFileButton: boolean;
  swSubFolderUploadFileButton: boolean;

  typeFolder: string;

  // collapedSideBar: boolean;

  paginationMainfolder = 1;
  paginationSubfolder = 1;

  checkPaginationMainfolder: boolean;
  checkPaginationSubfolder: boolean;

  uploadButton: boolean; // ปุ่มupload

  // pagination per page
  perPageSelectedFolder = 5;
  perPageSelectedSubFolder = 5;








  constructor(private serviceShare: ShareFileMemberService,
              private authen: AuthenService ,
              private modalService: NgbModal,
              private service: FolderService,
              private toastr: ToastrService,
              private dialogService: DialogService,
              private serviceFile: FileService,
              private redirect: RedirectLoginService) { }

  ngOnInit() {
    this.isActiveDepartment = true; // สมาชิก
    this.isActiveShareFile = false; // ไฟล์ที่ใช้ร่วมกัน

    // tslint:disable-next-line:radix
    this.departmentId = parseInt(this.authen.getDepartmentId()); // set department id จาก session storage
    this.readDepartment(this.departmentId);
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  // สมาชิก
  activeDepartment() {
    this.isActiveShareFile = false;
    this.isActiveDepartment = true;
    this.readDepartment(this.departmentId);
  }

  // ไฟล์ที่ใช้ร่วมกัน
  activeShareFile() {
    this.isActiveDepartment = false;
    this.isActiveShareFile = true;
  }

  // เรียกดูสมาชิกภายในหน่วยงานทั้งหมด
  readDepartment(departmentId: number) {
    this.serviceShare.readMemberDepartment(departmentId).subscribe((res: ShareFileMember[]) => {
        this.serviceShare.listMemberDepartment = res;
    } , err => {
        console.log(err);
    });
  }

}
