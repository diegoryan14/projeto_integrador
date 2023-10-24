<?php

class Cadastrocaminhao extends Controller
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
        $this->view->title = "Cadastro Caminhão";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/cadastrocaminhao/app.vue.js");
        array_push($this->view->css, "views/cadastrocaminhao/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }
}