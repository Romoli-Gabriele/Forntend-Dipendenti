@extends('layout')
@section('body')
<h1>Dipendenti</h1>
<a href="{{route('dipendente.create')}}" class="btn-success">Aggiungi</a>
<table class="table table-striped table table-bordered">
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">Nome</th>
        <th scope="col">Cognome</th>
        <th scope="col">Sesso</th>
        <th scope="col">Data di nascita</th>
        <th scope="col">Hire Date</th>
        <th scope="col">Azioni</th>
      </tr>
    </thead>
    @foreach ($dipendenti as $dipendente)
    <tr>
        <td>{{$dipendente->id}}</td>
        <td>{{$dipendente->firstName}}</td>
        <td>{{$dipendente->lastName}}</td>
        <td>{{$dipendente->gender}}</td>
        <td>{{$dipendente->birthDate}}</td>
        <td>{{$dipendente->hireDate}}</td>
        <td>
          <form action="{{route('dipendente.destroy', ['dipendente'=>$dipendente->id])}}" method="POST">
            @csrf
            @method('delete')
            <button type="submit" class="btn btn-danger">Elimina</button></form></td>
    </tr>
    @endforeach
</table>
{{ $dipendenti->links() }}
@endsection