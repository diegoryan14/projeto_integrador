<?php

class SelecionarCarga extends Controller
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
        $this->view->title = "Selecionar Carga";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/selecionarCarga/app.vue.js");
        array_push($this->view->css, "views/selecionarCarga/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }
}