<?php

class CadastroCarga extends Controller
{

    function __construct()
    {
        parent::__construct();
        $this->view->js = array();
        $this->view->css = array();
    }

    function index()
    {
        // Auth::autentica();
        $this->view->title = "Cadastro Carga";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/cadastroCarga/app.vue.js");
        array_push($this->view->css, "views/cadastroCarga/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

    // function get_cargas()
    // {
    //     $this->model->get_cargas();
    // }

    function get_empresa()
    {
        $this->model->get_empresa();
    }
    
    function get_estado()
    {
        $this->model->get_estado();
    }

    function get_cidade()
    {
        $this->model->get_cidade();
    }

    function cadastrarCarga()
    {
        $this->model->cadastrarCarga();
    }
}