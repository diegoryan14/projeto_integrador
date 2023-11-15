<?php

class ListaSolicitacao extends Controller
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
        $this->view->title = "Lista de Solicitações";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/listaSolicitacao/app.vue.js");
        array_push($this->view->css, "views/listaSolicitacao/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }
}