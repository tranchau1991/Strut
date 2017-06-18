<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var_dump($_POST);
if(isset($_POST)){
    if(!empty($_POST['identifier'])){
        //echo $_POST['identifier'];
       $data_content = $_POST['data_content'];
       $folder='data_save/';
       //var_dump($folder);
	   $ip= seo_friendly_url(getUserIP());
	   $folder =$folder. $ip."_";
       $a = file_put_contents($folder.$_POST['identifier'], $data_content);
      // var_dump($a);
	  
    }
    
}

function seo_friendly_url($string){
	$string = str_replace(array(':'), '', $string);
    $string = preg_replace('/\[:*\]/U', '', $string);
    //$string = str_replace(array('[\', \']'), '', $string);
    //$string = preg_replace('/\[.*\]/U', '', $string);
    //$string = preg_replace('/&(amp;)?#?[a-z0-9]+;/i', '-', $string);
    //$string = htmlentities($string, ENT_COMPAT, 'utf-8');
    //$string = preg_replace('/&([a-z])(acute|uml|circ|grave|ring|cedil|slash|tilde|caron|lig|quot|rsquo);/i', '\\1', $string );
    //$string = preg_replace(array('/[^a-z0-9]/i', '/[-]+/') , '-', $string);
    return strtolower(trim($string, '-'));
}

function getUserIP() {
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_X_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if(isset($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
    else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if(isset($_SERVER['REMOTE_ADDR']))
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}