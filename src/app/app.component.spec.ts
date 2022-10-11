import {
  ComponentFixture,
  TestBed,
  inject,
  tick,
  fakeAsync,
  waitForAsync,
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { of } from 'rxjs';
import { Post } from './post.model';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;

  let service: AppService;
  let spy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    // Mocking using jasmine.createSpyObj

    const postServiceSpy = jasmine.createSpyObj<AppService>(['getData']);
    const returnMockData: Post[] = [
      { userId: 1, id: 1, title: 'test1', body: 'test1' },
      { userId: 2, id: 2, title: 'test2', body: 'test2' },
    ];

    postServiceSpy.getData.and.callFake(() => {
      return of(returnMockData);
    });

    TestBed.configureTestingModule({
      declarations: [AppComponent],

      providers: [
        {
          provide: AppService,
          useValue: postServiceSpy,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    console.log(de);
    expect(component).toBeTruthy();
  }));

  it('should have total number of posts of 2', () => {
    expect(component.totalPosts).toEqual(2);
    expect(component.sumPosts()).toEqual(2);
  });

  it('should have an H1 tag of `Top 1 Posts`', () => {
    expect(de.query(By.css('h1')).nativeElement.innerText).toContain(
      'Top 2 Posts'
    );
  });
});
