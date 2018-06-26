import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit, OnDestroy {
  post: Post;
  isLoading = false;
  imagePreview: string;
  private postId: string;
  private authStatusSub: Subscription;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.postId = paramMap.get('postId');
      this.isLoading = true;
      this.postsService.getPost(this.postId).subscribe(postData => {
        this.isLoading = false;
        this.imagePreview = postData.imagePath;
        this.post = {
          id: postData._id,
          title: postData.title,
          content: postData.content,
          imagePath: postData.imagePath,
          creator: postData.creator,
          comments: postData.comments
        };
      });
    });
  }

  onComment(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value.content);
    // this.isLoading = true;
    console.log(this.postId);
    this.postsService.addComment(form.value.content, this.postId);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
