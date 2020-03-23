import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FolderService } from 'src/app/shared/folder.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Folder } from 'src/app/shared/folder.model';
import { DialogService } from 'src/app/shared/dialog.service';
import { Subfolder } from 'src/app/shared/subfolder.model';
import { FileService } from 'src/app/shared/file.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';
import { ResponseContentType, Http } from '@angular/http';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { MyFileMainFolder } from 'src/app/shared/my-file-main-folder.model';
import { AuthenService } from 'src/app/shared/authen.service';
import { MyFileSubFolder } from 'src/app/shared/my-file-sub-folder.model';





@Component({
  selector: 'app-my-file',
  templateUrl: './my-file.component.html',
  styleUrls: ['./my-file.component.scss']
})
export class MyFileComponent implements OnInit {
  // pdfSrc: string = '‪C:/Users/MandariN/Desktop/pdf-test.pdf';
  pdfSrc: string = 'assets/pdf-test.pdf';
  page:number = 1;


  // closeResult: string;
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


  collapedSideBar: boolean;

  paginationMainfolder = 1;
  paginationSubfolder = 1;

  checkPaginationMainfolder: boolean;
  checkPaginationSubfolder: boolean;

  constructor(
    private modalService: NgbModal,
    private service: FolderService,
    private toastr: ToastrService,
    private dialogService: DialogService,
    private serviceFile: FileService,
    private authen: AuthenService

  ) {}

  ngOnInit() {
    // tslint:disable-next-line:radix
    this.memberId = parseInt(this.authen.getId()); // set id from session
    // console.log('memberid : ' + this.memberId);
    this.refeshMainFolder(this.memberId);

    this.resetForm();
    this.swEditMenu = false; // dropdown แก้ไข เมนู

    this.swMainFolderElement = true;
    this.swSubFolderElement = false;
    this.swFileElement = false;

    this.swCreateMainFolderButton = true;
    this.swCreateSubFolderButton = false;

    this.swSelectMainFolderButton = true; // ปุ่มรายการที่เลือก
    this.swSelectSubFolderButton = false;
    this.swSelectFileButton = false;

    this.swDownload = false;

    this.swMainFolderUploadFileButton = true;
    this.swSubFolderUploadFileButton = false;

    this.typeFolder = 'mainFolder';

    this.checkPaginationMainfolder = false;
    this.checkPaginationSubfolder = false;
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    // clear main folder
    this.service.formData = {
      FOLDER_ID: null,
      MEMBER_ID: null,
      SUB_FOLDER_ID: null,
      FOLDER_NAME: '',
      FOLDER_NAME_DIR: '',
      PATH_FOLDER: '',
      RECORD_STATUS: '',
      CREATE_USER: '',
      CREATE_DATE: '',
      UPD_USER: '',
      UPD_DATE: ''
    };
    // clear sub folder
    this.service.formSubFolder = {
      FOLDER_ID: null,
      MEMBER_ID: null,
      SUB_FOLDER_ID: null,
      FOLDER_NAME: '',
      FOLDER_NAME_DIR: '',
      PATH_FOLDER: '',
      RECORD_STATUS: '',
      CREATE_USER: '',
      CREATE_DATE: '',
      UPD_USER: '',
      UPD_DATE: ''
    };

    // clear file
    this.serviceFile.formFileData = {
      FILE_ID: null,
      SUB_FOLDER_ID: null,
      MEMBER_ID: null,
      FILE_NAME_DISPLAY: '',
      FILE_NAME: '',
      FILE_PATH: '',
      RECORD_STATUS: '',
      CREATE_USER: '',
      CREATE_DATE: '',
      UPD_USER: '',
      UPD_DATE: ''
    };
  }

  switchFolderElement(type) {
    if (type === 'mainFolder') {
      this.swMainFolderElement = true;
      this.swSubFolderElement = false;
      this.swFileElement = false;

    } else if (type === 'subFolder') {
      this.swMainFolderElement = false;
      this.swSubFolderElement = true;
      this.swFileElement = false;
    } else { // กรณี file
      this.swMainFolderElement = false;
      this.swSubFolderElement = false;
      this.swFileElement = true;
    }
  }

  switchCreateFolderButton(type) {
    if (type === 'mainFolder') {
      this.swCreateMainFolderButton = true;
      this.swCreateSubFolderButton = false;
    } else if (type === 'subFolder') {
      this.swCreateMainFolderButton = false;
      this.swCreateSubFolderButton = true;
    } else {
      this.swCreateMainFolderButton = false;
      this.swCreateSubFolderButton = false;
    }
  }

  switchUploadFileButton(type) {
    if (type === 'mainFolder') {
      this.swMainFolderUploadFileButton = true;
      this.swSubFolderUploadFileButton = false;
    } else {
      this.swMainFolderUploadFileButton = false;
      this.swSubFolderUploadFileButton = true;
    }

  }

  switchSelectFolderButton(type) {
    if (type === 'mainFolder') {
      this.swSelectMainFolderButton = true; // ปุ่มรายการที่เลือก
      this.swSelectSubFolderButton = false;
      this.swSelectFileButton = false;

    } else if (type === 'subFolder') {
      this.swSelectMainFolderButton = false; // ปุ่มรายการที่เลือก
      this.swSelectSubFolderButton = true;
      this.swSelectFileButton = false;
    } else {
      this.swSelectMainFolderButton = false; // ปุ่มรายการที่เลือก
      this.swSelectSubFolderButton = false;
      this.swSelectFileButton = true;
    }
  }

  clearMainFolderValue() {
    this.disableSelectedButton = true;
    this.refeshMainFolder(this.memberId);
    this.listChooseCheckBox = [];
    this.listCheckBoxName = [];
    this.listCheckBoxType = [];
    this.choose = 0;
    this.unChoose = 0;
  }

  backToMainFolder() {
    this.switchCreateFolderButton('mainFolder');
    this.switchUploadFileButton('mainFolder');
    this.switchSelectFolderButton('mainFolder');
    this.switchFolderElement('mainFolder');
    this.disableBackButton = true;
    this.clearMainFolderValue();
    this.typeFolder = 'mainFolder';
    this.paginationMainfolder = 1;
    this.paginationSubfolder = 1;
  }

  // event checkbox
  changeCheck(event, id , name , type) {
    if (event.checked) {
      this.listChooseCheckBox.push(id);
      this.listCheckBoxName.push(name);
      this.listCheckBoxType.push(type);
      this.fileName = name;
      this.choose += 1;
    } else {
      // ลบ id ใน array กรณีที่ไม่ได้เลือก checkbox
      const index = this.listChooseCheckBox.indexOf(id, 0);
      if (index > -1) {
        this.listChooseCheckBox.splice(index, 1);
      }
      // จบลบ id
      // ลบชื่อ ออกจาก array
      const indexName = this.listCheckBoxName.indexOf(name, 0);
      if (indexName > -1) {
        this.listCheckBoxName.splice(indexName, 1);
      }
      // ลบ type ออกจาก array
      const indexType = this.listCheckBoxType.indexOf(type, 0);
      if (indexType > -1) {
        this.listCheckBoxType.splice(indexType, 1);
      }

      this.unChoose += 1;
    }

    // check ถ้ามีการเลือกให้เปิดปุ่ม
    if (this.choose > this.unChoose) {
      this.disableSelectedButton = false;
    } else {
      this.disableSelectedButton = true;
    }

    // ให้แก้ไขได้เฉพาะเลือก checkbox เพียง 1 เดียวเท่านั้น
    if (this.listChooseCheckBox.length === 1) {
      this.swEditMenu = true; // dropdown แก้ไข เมนู
      this.swDownload = true;
    } else {
      this.swEditMenu = false; // dropdown แก้ไข เมนู
      this.swDownload = true;
    }
  }

  changeCheckFile(event, id , name) {
    if (event.checked) {
      this.listChooseCheckBox.push(id);
      this.choose += 1;
      this.fileName = name;
      // console.log(this.fileName);
    } else {
      // ลบ id ใน array กรณีที่ไม่ได้เลือก checkbox
      const index = this.listChooseCheckBox.indexOf(id, 0);
      if (index > -1) {
        this.listChooseCheckBox.splice(index, 1);
      }
      // จบลบ id
      this.unChoose += 1;
    }
    // check ถ้ามีการเลือกให้เปิดปุ่ม
    if (this.choose > this.unChoose) {
      this.disableSelectedButton = false;
    } else {
      this.disableSelectedButton = true;
    }

    // ให้แก้ไขได้เฉพาะเลือก checkbox เพียง 1 เดียวเท่านั้น
    if (this.listChooseCheckBox.length === 1) {
      this.swEditMenu = true; // dropdown แก้ไข เมนู
      this.swDownload = true;
    } else {
      this.swEditMenu = false; // dropdown แก้ไข เมนู
      this.swDownload = true;
    }
  }

  // แสดงข้อมูลในส่วนของ main folder
  refeshMainFolder(id: number) {
      this.service.refreshMainFolder(id).subscribe((res: MyFileMainFolder[]) => {
        // this.service.list = Object.assign({}, res);
        this.service.list = res;

        if (res.length > 0 ) { // กรณีมีข้อมูลใน main folder
          this.checkPaginationMainfolder = true;
        }
      });
  }

    // แสดงข้อมูลในส่วนของ sub folder
  refreshSubFolder(id: number) {
      this.service.refreshSubFolder(id).subscribe((res: MyFileSubFolder[]) => {
        this.service.listSubFolder = res;
        if (res.length > 0 ) { // กรณีมีข้อมูลใน sub folder
          this.checkPaginationSubfolder = true;
        }
      });
  }



  // main folder
  // กรณีแก้ไขเซ็ทค่าให้กับ form modal
  setValueMainFolderForm() {
    for (const id of this.listChooseCheckBox) {
      this.service.getMainFolder(id).subscribe((res: Folder) => {
        this.service.formData = Object.assign({}, res);
      });
      this.listChooseCheckBox = [];
      this.listCheckBoxName = [];
      this.listCheckBoxType = [];
      this.disableSelectedButton = true;
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.FOLDER_ID == null) {
      this.insertRecord(form , this.memberId);
    } else {
      this.updateRecord(form , this.memberId);
    }
  }

  insertRecord(form: NgForm , id: number) {
    this.service.postMainFolder(form.value , id).subscribe(res => {
      this.toastr.success('Inserted successfully', 'EMP. Register');
      this.resetForm(form);
      // this.service.refreshList(1);
      this.refeshMainFolder(this.memberId);
    });
  }

  updateRecord(form: NgForm , id: number) {
    this.service.putMainFolder(form.value , id).subscribe(res => {
      this.toastr.info('Updated successfully', 'EMP. Register');
      this.resetForm(form);
      // this.service.refreshList(1);
      this.refeshMainFolder(this.memberId);
    });
  }

  onDelete() {
    this.dialogService
      .confirm(
        'ยืนยันการลบรายการ..',
        'ต้องการลบ ' + this.listChooseCheckBox.length + ' รายการหรือไม่ ?'
      )
      .then(confirmed => {
        if (confirmed) {
          // ok=true cancel=false
          for (const id of this.listChooseCheckBox) {
            this.service.deleteMainFolder(id).subscribe(res => {
              // this.service.refreshList(1);
              this.refeshMainFolder(this.memberId);
              this.toastr.warning('Deleted successfully', 'EMP. Register');
            });
          }
          this.clearMainFolderValue();
        }
        // กรณี cancel ลบ
        this.clearMainFolderValue();
      })
      .catch(() =>
        /*console.log(
          'User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'
        )*/
        // กรณี ปิด confirmed modal ด้วยวิธีอื่นๆ
        this.clearMainFolderValue()
      );
  }

  // sub folder
  clearSubFolderValue() {
    this.disableSelectedButton = true;
    // this.service.refreshSubFolder(this.mainFolderId);
    this.refreshSubFolder(this.mainFolderId);
    this.listChooseCheckBox = [];
    this.listCheckBoxName = [];
    this.listCheckBoxType = [];
    this.choose = 0;
    this.unChoose = 0;
  }
  onSelectFolder(id: number) {
    this.checkPaginationSubfolder = false; // ปิด pagination ไว้ก่อนค่อย check ทีหลัง
    this.typeFolder = 'subFolder';
    this.mainFolderId = id; // set main folder id ค่าให้กับ  sub folder
    // this.service.refreshSubFolder(id);
    this.refreshSubFolder(id); // แสดง sub folder

    this.switchCreateFolderButton('subFolder');
    this.switchUploadFileButton('subFolder');
    this.switchSelectFolderButton('subFolder');
    this.switchFolderElement('subFolder'); // เปลี่ยนใช้ sub folder element
    this.disableBackButton = false;
    this.disableSelectedButton = true;
    this.listChooseCheckBox = [];
    this.listCheckBoxName = [];
    this.listCheckBoxType = [];
    this.choose = 0;
    this.unChoose = 0;
  }

  setId() {
    this.valueMainFolderId = this.mainFolderId; // set main folder id ค่าให้กับ  sub folder
  }

  setValuesubFolderForm() {
    for (const id of this.listChooseCheckBox) {
      this.service.findByIdSubFolder(id).subscribe((res: Subfolder) => {
        this.service.formSubFolder = Object.assign({}, res);
      });
      this.listChooseCheckBox = [];
      this.listCheckBoxName = [];
      this.listCheckBoxType = [];
      this.disableSelectedButton = true;
    }
  }
  onSubmitSubfolder(form: NgForm) {
    console.log(form.value);
    if (form.value.FOLDER_ID == null) {
      this.insertSubFolder(form);
    } else {
      this.updateSubFolder(form , this.memberId);
    }
  }

  insertSubFolder(form: NgForm) {
    this.service.postSubFolder(form.value).subscribe(res => {
      this.toastr.success('Inserted successfully', 'EMP. Register');
      this.resetForm(form);
      // this.service.refreshSubFolder(this.mainFolderId);
      this.refreshSubFolder(this.mainFolderId);
    });
  }

  updateSubFolder(form: NgForm , id: number) {
    this.service.putSubFolder(form.value , id).subscribe(res => {
      this.toastr.info('Updated successfully', 'EMP. Register');
      this.resetForm(form);
      // this.service.refreshSubFolder(this.mainFolderId);
      this.refreshSubFolder(this.mainFolderId);
    });
  }

  onDeleteSubFolder() {
    this.dialogService
      .confirm(
        'ยืนยันการลบรายการ..',
        'ต้องการลบ ' + this.listChooseCheckBox.length + ' รายการหรือไม่ ?'
      )
      .then(confirmed => {
        if (confirmed) {
          // ok=true cancel=false
          for (const id of this.listChooseCheckBox) {
            this.service.deleteSubFolder(id).subscribe(res => {
              // this.service.refreshSubFolder(this.mainFolderId);
              this.refreshSubFolder(this.mainFolderId);
              this.toastr.warning('Deleted successfully', 'EMP. Register');
            });
          }
          this.clearSubFolderValue();
        }
        // กรณี cancel ลบ
        this.clearSubFolderValue();
      })
      .catch(() =>
        /*console.log(
          'User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'
        )*/
        // กรณี ปิด confirmed modal ด้วยวิธีอื่นๆ
        this.clearSubFolderValue()
      );
  }

  onSelectSubFolder(id: number) {
    this.subFolderId = id; // set sub folder id ค่าให้กับ  file
    this.serviceFile.findByIdFile(id);
    this.switchFolderElement('file');
    this.switchCreateFolderButton('file');
    this.switchSelectFolderButton('file');
    this.listChooseCheckBox = [];
    this.listCheckBoxName = [];
    this.listCheckBoxType = [];
    this.choose = 0;
    this.unChoose = 0;
    this.disableBackButton = false;
    this.disableSelectedButton = true;
  }

  // file
  // เลือกไฟล์
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadFileMainFolder() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.serviceFile.postUploadFile(this.currentFileUpload, this.memberId).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
        // this.autoClick();
        this.delay(5000);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
      this.refeshMainFolder(this.memberId);
      // this.serviceFile.findByIdFile(this.subFolderId);
    });
    this.toastr.success('upload file successfully', 'EMP. Register');
  }

  // หน่วงเวลา
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => this.autoClick() );
  }

  autoClick() {
    const buttonClick: HTMLElement = document.getElementById('closeModal') as HTMLElement ;
    buttonClick.click();
  }


  uploadFileSubFolder() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.serviceFile.postUploadFileSubFolder(this.currentFileUpload, this.mainFolderId).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
        this.delaySubFolder(5000);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
      // this.refeshMainFolder(this.memberId);
      // this.service.refreshSubFolder(this.mainFolderId);
      this.refreshSubFolder(this.mainFolderId);
    });
    this.toastr.success('upload file successfully', 'EMP. Register');
  }

  // หน่วงเวลา
  async delaySubFolder(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => this.autoClickSubFolder() );
  }

  autoClickSubFolder() {
    const buttonClick: HTMLElement = document.getElementById('closeModalSubFolder') as HTMLElement ;
    buttonClick.click();
  }

  onDeleteFile() {
    this.dialogService
      .confirm(
        'ยืนยันการลบรายการ..',
        'ต้องการลบ ' + this.listChooseCheckBox.length + ' รายการหรือไม่ ?'
      )
      .then(confirmed => {
        if (confirmed) {
          // ok=true cancel=false
          for (const id of this.listChooseCheckBox) {
            this.serviceFile.deleteFile(id).subscribe(res => {
              if (this.typeFolder === 'mainFolder') {
                this.refeshMainFolder(this.memberId);
              } else {
                // this.service.refreshSubFolder(this.mainFolderId);
                this.refreshSubFolder(this.mainFolderId);
              }
              this.toastr.warning('Deleted successfully', 'EMP. Register');
            });
          }
          this.clearFileValue();
        }
        // กรณี cancel ลบ
        this.clearFileValue();
      })
      .catch(() =>
        /*console.log(
          'User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'
        )*/
        // กรณี ปิด confirmed modal ด้วยวิธีอื่นๆ
        this.clearFileValue()
      );
  }

  clearFileValue() {
    if (this.typeFolder === 'mainFolder') {
      this.refeshMainFolder(this.memberId);
    } else {
      // this.service.refreshSubFolder(this.mainFolderId);
      this.refreshSubFolder(this.mainFolderId);
    }
    this.disableSelectedButton = true;
    this.listChooseCheckBox = [];
    this.listCheckBoxName = [];
    this.listCheckBoxType = [];
    this.choose = 0;
    this.unChoose = 0;
  }

  onDownload() {
    for (const id of this.listChooseCheckBox) {
      this.serviceFile.downloadFile(id).subscribe(
        data => {
          // console.log(this.fileName);
          saveAs(data, this.fileName);
          if (this.typeFolder === 'mainFolder') {
            this.refeshMainFolder(this.memberId);
          } else {
            // this.service.refreshSubFolder(this.mainFolderId);
            this.refreshSubFolder(this.mainFolderId);
          }
        },
        err => {
          this.toastr.warning('Problem while downloading the file.', 'warning');
          console.error(err);
        }
      );
    }
    this.clearFileValue();
  }

// ปุ่มรายการที่เลือก
  onSelectButton() {
    // console.log(this.listCheckBoxType);
    for (const id of this.listCheckBoxType) {
        if (id === 'folder' || id === 'sub-folder') {
          this.swDeleteFolder = true;
          this.swDeleteFile = false ;
        } else {
          this.swDeleteFolder = false;
          this.swDeleteFile = true ;
        }
    }
  }


  // modal
  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  openWindowCustomClass(content) {
    this.progress.percentage = 0; // เคลียค่าหลอด upload
    this.currentFileUpload = null ; // ซ่อนหลอด upload
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }
  /*
  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  */
  // end-modal

}
