/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;


/**
 *
 * @author LittleChinese
 */
public class Categorias_Admin {
    
    WebDriver driver;

     
   @Before
  
     public void home() throws Exception{
             driver = new ChromeDriver();
           
         driver.get("http://brandic.devll.eu:61080/");
         driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
         Thread.sleep(1000);
  
         driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/a")).click();
            Thread.sleep(1000);
            
            driver.findElement(By.name("email")).sendKeys("admin@admin.admin"); 
            driver.findElement(By.name("password")).sendKeys("admin");         
         driver.findElement(By.xpath("/html/body/app-root/div/app-login/div/div/form/button")).click();       
           Thread.sleep(1000);
           
       

    }
     
     
           @Test 
     public void admin_Editar() throws Exception {
          driver.get("http://brandic.devll.eu:61080/#/admin/categories"); 
          Thread.sleep(1000);
      driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div/div[1]/div[2]/form[1]/button[2]")).click();
      Thread.sleep(1000);
          WebElement edit = driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div/div[1]/div[2]/form[1]/input"));
           edit.clear();
           edit.sendKeys("Artes Plásticas/Artes Decorativas");
        driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div/div[1]/div[2]/form[1]/button[1]")).click();
        Thread.sleep(1000);
           
          
      }
     
     
         @Test
         public void admin_CriarCategoria() throws Exception {
         driver.get("http://brandic.devll.eu:61080/#/admin/categories");
         driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div/div[1]/form[1]/input")).sendKeys("Teste");
         driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div/div[1]/form[1]/button")).click();
          Thread.sleep(1000);
      
     }
      
        @Test
         public void admin_ProcurarEncontrado () throws Exception {
         driver.get("http://brandic.devll.eu:61080/#/admin/categories");
         driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div/div[1]/form[2]/input")).sendKeys("Teste");
         WebElement enter = driver.findElement(By.xpath("html/body/app-root/div/app-categories/div/div/div/div[1]/form[2]/input"));
         enter.sendKeys(Keys.ENTER);
        
          
      }
         @Test
         public void Admin_NaoEncontrado() throws Exception {
         driver.get("http://brandic.devll.eu:61080/#/admin/categories");
         WebElement procurar = driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div/div[1]/form[2]/input"));
         procurar.clear();
         procurar.sendKeys("Cultura");
         WebElement enter = driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div/div[1]/form[2]/input"));
         enter.sendKeys(Keys.ENTER);
         }
         
         

         
}
