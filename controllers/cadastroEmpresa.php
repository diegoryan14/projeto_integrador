<?php

class CadastroEmpresa extends Controller
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
        $this->view->title = "Cadastro Empresa";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/cadastroEmpresa/app.vue.js");
        array_push($this->view->css, "views/cadastroEmpresa/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

    function Cadastrar_empresa()
    {
        $this->model->Cadastrar_empresa();
    }

}