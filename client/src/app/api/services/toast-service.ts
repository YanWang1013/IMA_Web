
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable()
export class ToastService {
    public isLoading = false;
    // https://sweetalert2.github.io/
    success(message) {
        Swal.fire({
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 5000
          });
    }

    error(message) {
        Swal.fire({
            icon: 'error',
            title: message,
            showConfirmButton: false,
            timer: 5000
          });
    }

    warning(message) {
        Swal.fire({
            icon: 'warning',
            title: message,
            showConfirmButton: false,
            timer: 5000
          });
    }

    info(message) {
        Swal.fire({
            icon: 'info',
            title: message,
            showConfirmButton: false,
            timer: 5000
          });
    }

    alertWarning() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              );
            }
          });
    }

    showLoading() {
        this.isLoading = true;
    }

    clearLoading() {
        this.isLoading = false;
    }
}
