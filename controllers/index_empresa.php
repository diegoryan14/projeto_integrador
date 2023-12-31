<?php

class Index_empresa extends Controller
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
        $this->view->title = "Home";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/index_empresa/app.vue.js");
        array_push($this->view->css, "views/index_empresa/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }
    function get_cargas()
    {
        $this->model->get_cargas();
    }
    function aceitarCarga()
    {
        $this->model->aceitarCarga();
    }
}