import { TestBed } from '@angular/core/testing';
import { AppService } from './app.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Post } from './post.model';

describe('AppService', () => {
  let service: AppService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AppService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a post array', () => {
    const mockPost: Post[] = [
      {
        userId: 1,
        id: 1,
        title: 'test',
        body: 'test',
      },
    ];

    service.getData().subscribe((result) => {
      expect(result).toBeTruthy;
      expect(result.length).toEqual(1);
      expect(result[0].title).toEqual('test');
    });

    const req = httpTestingController.expectOne(
      'https://jsonplaceholder.typicode.com/posts'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);
  });
});
