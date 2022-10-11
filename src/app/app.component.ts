import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  posts: Post[];
  totalPosts: number;
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getData().subscribe((data) => {
      this.posts = data;
      this.totalPosts = this.sumPosts();
    });
  }
  sumPosts(): number {
    return this.posts.length;
  }
}
