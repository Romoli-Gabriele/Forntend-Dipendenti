@extends('layout')
@section('body')

        <div class="card position-absolute top-50 start-50 translate-middle" style="width: 20rem;">
            <div class="card-body">
                <h5 class="card-title">Aggiungi Dipendente</h5>
                <form action="{{ route('dipendente.store') }}" method="POST">
                    @csrf
                    <div class="row g-3">
                        <div class="col">
                            <input type="text" name="firstName" class="form-control" placeholder="First name"
                                aria-label="First name">
                        </div>
                        <div class="col">
                            <input type="text" name="lastName" class="form-control" placeholder="Last name"
                                aria-label="Last name">
                        </div>
                    </div>
                    <div class="mt-1">
                        <select name="gender" class="form-select" aria-label="Default select example">
                            <option value="m">Male</option>
                            <option value="f">Female</option>
                            <option value="o">Other</option>
                        </select><br>
                    </div>
                    <div class="row g-3 ">
                        <div class="col">
                            <label>Birth Date</label>
                        </div>
                        <div class="col">
                            <input type="date" name="birthDate" class="form-control">
                        </div>
                    </div>
                    <div class="row g-3 mt-2">
                        <div class="col">
                            <label>Hire Date</label>
                        </div>
                        <div class="col">
                            <input type="date" name="hireDate" class="form-control">
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col">
                            <button type="submit" class="btn btn-primary mt-1">Submit</button>
                        </div>
                        <div class="col">
                            <button type="reset" class="btn btn-danger mt-1">Reset</button>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>
    @endsection
