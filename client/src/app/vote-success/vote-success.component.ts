import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-vote-success',
  templateUrl: './vote-success.component.html',
  styleUrls: ['./vote-success.component.scss']
})
export class VoteSuccessComponent implements OnInit {
  slug = '';
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.slug = this.activatedRoute.snapshot.paramMap.get('slug');
  }

  openFb() {
    window.open('https://www.facebook.com/sharer/sharer.php?u=https://itstheimasapp.com/vote/' + this.slug, 'pop'
    , 'width=600, height=400, scrollbars=no');
  }

  openTwitter() {
      window.open('https://twitter.com/intent/tweet?url=https://itstheimasapp.com/vote/' +  this.slug + '&via=' +  + this.slug, 'pop',
      'width=600, height=400, scrollbars=no');
      // &text=Anne Hathaway
  }

}
