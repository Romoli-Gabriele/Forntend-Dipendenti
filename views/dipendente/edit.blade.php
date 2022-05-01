@extends('layout')
@section('body')
<form action="{{route('dipendente.update')}}" method="POST">
    @csrf
    <input type="text" name="firstName" value="{{$dipendente->firstName}}">
    <input type="text" name="lastName" value="{{$dipendente->lastName}}">
    <select name="gender">
        <option value="M">Male</option>
        <option value="F">Female</option>
        <option value="O">Other</option>
    </select>
    <input type="date" name="birthDate">
    <input type="date" name="hireDate">
    <button type="submit" class="bg-primary"></button>
</form>
@endsection