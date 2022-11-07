import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InyeccionContenidoComponent } from './inyeccion-contenido.component';

describe('InyeccionContenidoComponent', () => {
  let component: InyeccionContenidoComponent;
  let fixture: ComponentFixture<InyeccionContenidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InyeccionContenidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InyeccionContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
