/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import org.junit.After;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
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
         public void admin_CriarCategoria() throws Exception {
              
        driver.get("http://brandic.devll.eu:61080/#/admin/categories");
         driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div/div[1]/form[1]/input")).sendKeys("Teste1234");
         driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div/div[1]/form[1]/button")).click();
          Thread.sleep(1000);
           WebElement msg= driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div[1]/strong"));
         assertEquals("Super categoria criada com sucesso",msg.getText());
     
                  
     }
         
      @After
     public void admin_Editar() throws Exception {
          
          driver.get("http://brandic.devll.eu:61080/#/admin/categories"); 
          Thread.sleep(1000);
            WebElement enter = driver.findElement(By.name("searchSuperCat"));
            enter.sendKeys("Teste1234");
           enter.sendKeys(Keys.ENTER); 
           Thread.sleep(1000);
         driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div[2]/div[1]/div[2]/form/button[2]")).click();
        Thread.sleep(1000);
          WebElement edit = driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div[2]/div[1]/div[2]/form/input"));
           edit.clear();
           edit.sendKeys("Bens Patrimoniais");
        driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div/div[1]/div[2]/form[1]/button[1]")).click();
        Thread.sleep(1000);
    
         WebElement msg = driver.findElement(By.className("alert-success"));
            if (!msg.isDisplayed())
                fail("not save");
          
                  
      }
     
        
          @After
         public void admin_CriarCategoria_Já_Criada() throws Exception {
                
         driver.get("http://brandic.devll.eu:61080/#/admin/categories");
         driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div/div[1]/form[1]/input")).sendKeys("Bens Patrimoniais");
         driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div/div[1]/form[1]/button")).click();
          Thread.sleep(1000);
         WebElement msg= driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div[1]/strong"));
         assertEquals("Já existe uma super categoria com esse nome",msg.getText());
      
      
     }
      
         @After
         public void admin_ProcurarEncontrado () throws Exception {
              
         driver.get("http://brandic.devll.eu:61080/#/admin/categories");
         WebElement procurar = driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div/div[1]/form[2]/input"));
       procurar.clear();
       procurar.sendKeys("Bens Patrimoniais");
         WebElement enter = driver.findElement(By.xpath("html/body/app-root/div/app-categories/div/div/div/div[1]/form[2]/input"));
         enter.sendKeys(Keys.ENTER);
                     WebElement msg = driver.findElement(By.className("list-group-item-action"));
            if (!msg.isDisplayed())
                fail("not found");
    
      } 
     
         
        @After
         public void Admin_NaoEncontrado() throws Exception {
                
        driver.get("http://brandic.devll.eu:61080/#/admin/categories");
         WebElement procurar = driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div/div[1]/form[2]/input"));
         procurar.clear();
         procurar.sendKeys("admin");
         WebElement enter = driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div/div[1]/form[2]/input"));
         enter.sendKeys(Keys.ENTER);
        WebElement msg = driver.findElement(By.className("alert-warning"));
         assertEquals("Não exitem Super Categorias",msg.getText());
         }
         
       @After
         public void admin_CriarCategoria_Teste() throws Exception {
                
        driver.get("http://brandic.devll.eu:61080/#/admin/categories");
         driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div/div[1]/form[1]/input")).sendKeys("Teste");
         driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div/div[1]/form[1]/button")).click();
          Thread.sleep(1000);
           WebElement msg= driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div[1]/strong"));
         assertEquals("Super categoria criada com sucesso",msg.getText());
     
         }    

         @After
         public void Admin_ApagarCategoria() throws Exception {
           Thread.sleep(1000);
          driver.get("http://brandic.devll.eu:61080/#/admin/categories");
           WebElement enter = driver.findElement(By.name("searchSuperCat"));
           enter.clear();
            enter.sendKeys("Teste");
           enter.sendKeys(Keys.ENTER); 
           Thread.sleep(1000);
          driver.findElement(By.xpath("/html/body/app-root/div/app-categories/div/div/div/div[1]/div[2]/form/button[3]")).click();
         Thread.sleep(1000);
         
         //pop-up
          driver.switchTo().alert().accept();
         Thread.sleep(1000);
         
          WebElement msg = driver.findElement(By.className("alert-success"));
            if (!msg.isDisplayed())
                fail("not save");
          
          
         }

}
