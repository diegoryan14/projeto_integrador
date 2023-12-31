<?php

class Perfil extends Controller
{

    function __construct()
    {
        parent::__construct();
        $this->view->js = array();
        $this->view->css = array();
    }

    function index()
    {
        Auth::autentica();
        $this->view->title = "Pefil";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/perfil/app.vue.js");
        array_push($this->view->css, "views/perfil/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

    function getUsuario()
    {
        $this->model->getUsuario();
    }
    function salvarPerfil()
    {
        $this->model->salvarPerfil();
    }
}