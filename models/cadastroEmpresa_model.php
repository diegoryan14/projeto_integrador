<?php

require_once("util/param.php");

class CadastroEmpresa_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function Cadastrar_empresa()
    {
        $post = json_decode(file_get_contents('php://input'));
        // var_dump($post);exit;

        $nome = $post->NOME;
        $CNPJ = $post->CNPJ;
        $email = $post->EMAIL;
        $senha = $post->SENHA;
        $confirm_senha = $post->CONFIRM_SENHA;
        $tipoUsuario = $post->TIPO_USUARIO;

        /* VALIDAR E-MAIL */
        if(filter_var($email, FILTER_VALIDATE_EMAIL)){
            true;
        } else{
            exit(json_encode(array("code" => "0", "msg" => "Opss!! E-mail está inválido!!")));
        }

        /* VALIDAR SENHA */
        if($senha != $confirm_senha){
            exit(json_encode(array("code" => "0", "msg" => "Senha diferentes!!.Por favor, digite novamente.")));
        }

        /* DECODIFICAÇAO DA SENHA */
        $senha_hash = hash('sha256', $senha);

        if($nome == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira o Nome.")));
        }
        else if($CNPJ == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira o CNPJ.")));
        }
        else if($email == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira o E-mail.")));
        }
        else {
            $nome = strtoupper($nome);
            $email = strtolower($email);

            $result = $this->db->insert('EMPRESA', array('NOME' =>$nome, 'CNPJ' => $CNPJ, 'EMAIL' => $email, 'SENHA' => $senha_hash, 'TIPO_USUARIO' => $tipoUsuario));

            if($result){
                exit(json_encode(array("code" => "1", "msg" => "Cadastro realizado com sucesso.")));
            } else{
                exit(json_encode(array("code" => "0", "msg" => "Erro ao inserir.")));
            }
        }
        echo (json_encode($msg));

    }
}