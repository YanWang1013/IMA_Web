import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-instant-success',
  templateUrl: './instant-success.component.html',
  styleUrls: ['./instant-success.component.scss']
})
export class InstantSuccessComponent implements OnInit {
  slug = '';
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.slug = this.activatedRoute.snapshot.paramMap.get('slug');
  }

  openFb() {
    window.open('https://www.facebook.com/sharer/sharer.php?u=https://itstheimasapp.com/instant_vote/' + this.slug, 'pop'
    , 'width=600, height=400, scrollbars=no');
  }

  openTwitter() {
      window.open('https://twitter.com/intent/tweet?url=https://itstheimasapp.com/instant_vote/' +  this.slug + '&via=' +  + this.slug, 'pop',
      'width=600, height=400, scrollbars=no');
      // &text=Anne Hathaway
  }


}
