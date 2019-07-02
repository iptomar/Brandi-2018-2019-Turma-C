/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 *
 * @author LittleChinese
 */

  

public class UtilizadorTentarAcederSiteAdmin {
     WebDriver driver;
     
    @Test
    public void UtilizadorTentarAcederAdmin() throws Exception {
        driver = new ChromeDriver();
        
      //   driver.get("http://localhost:8080/#/");
       driver.get("http://brandic.devll.eu:61080/");
        driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
        Thread.sleep(1000);

        driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/a")).click();
        Thread.sleep(1000);

        driver.findElement(By.name("email")).sendKeys("teste123456@ipt.pt");
        driver.findElement(By.name("password")).sendKeys("123456");

        driver.findElement(By.xpath("/html/body/app-root/div/app-login/div/div/form/button")).click();
        Thread.sleep(1000);
        
        
        //AO TENTAR ACEDER NÃO ACONTECE NADA. CONTINUA NO HOME
        driver.get("http://brandic.devll.eu:61080/#/admin/user/list");
        Thread.sleep(1000);
         //AO TENTAR ACEDER NÃO ACONTECE NADA. CONTINUA NO HOME
        driver.get("http://brandic.devll.eu:61080/#/admin/user/register");
        Thread.sleep(1000);
         //AO TENTAR ACEDER NÃO ACONTECE NADA. CONTINUA NO HOME
        driver.get("http://brandic.devll.eu:61080/#/admin/categories");
             
             
    }
    
}
    
    

