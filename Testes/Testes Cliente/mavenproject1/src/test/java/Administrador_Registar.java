/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

/*
/**
 *
 * @author LittleChinese
 */
 
public class Administrador_Registar {
    
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
      public void admin_RegistarUtilizador() throws Exception {
 
        driver.get("http://brandic.devll.eu:61080/");
        driver.findElement(By.xpath("//*[@id=\"navbar\"]/button/span")).click();
        Thread.sleep(1000);
        driver.findElement(By.id("navbarDropdownAdmin")).click();
       Thread.sleep(1000);
     //driver.findElement(By.linkText("/admin/user/register")).click();
       driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[3]/div/a[2]")).click();
      Thread.sleep(1000);
    driver.findElement(By.name("email")).sendKeys("teste1234@ipt.pt"); 
    driver.findElement(By.name("full_name")).sendKeys("marcio");
    driver.findElement(By.name("address")).sendKeys("rua do ipt"); 
       driver.findElement(By.name("birthday")).sendKeys("123456789"); 
       driver.findElement(By.name("cellphone")).sendKeys("912365478"); 
       driver.findElement(By.name("qualifications")).sendKeys("11");
       driver.findElement(By.name("title")).sendKeys("empregado");
        Select select = new Select(driver.findElement(By.name("id_type_user")));
       select.selectByValue("2");
                   Thread.sleep(3000);
       driver.findElement(By.name("passwordNew")).sendKeys("123456"); 
       driver.findElement(By.name("passwordNewConf")).sendKeys("123456");
       driver.findElement(By.xpath("/html/body/app-root/div/app-user-register/div/div/form/div[6]/button")).click();
     Thread.sleep(1000);
         
}
     @Test 
      public void admin_RegistarUtilizador_Password() throws Exception {
 
        driver.get("http://brandic.devll.eu:61080/");
        driver.findElement(By.xpath("//*[@id=\"navbar\"]/button/span")).click();
        Thread.sleep(1000);
        driver.findElement(By.id("navbarDropdownAdmin")).click();
       Thread.sleep(1000);
     //driver.findElement(By.linkText("/admin/user/register")).click();
       driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[3]/div/a[2]")).click();
      Thread.sleep(1000);
    driver.findElement(By.name("email")).sendKeys("teste1234@ipt.pt"); 
    driver.findElement(By.name("full_name")).sendKeys("marcio");
    driver.findElement(By.name("address")).sendKeys("rua do ipt"); 
       driver.findElement(By.name("birthday")).sendKeys("123456789"); 
       driver.findElement(By.name("cellphone")).sendKeys("912365478"); 
       driver.findElement(By.name("qualifications")).sendKeys("11");
       driver.findElement(By.name("title")).sendKeys("empregado");
        Select select = new Select(driver.findElement(By.name("id_type_user")));
       select.selectByValue("2");
                   Thread.sleep(3000);
       driver.findElement(By.name("passwordNew")).sendKeys("123456"); 
       driver.findElement(By.name("passwordNewConf")).sendKeys("1234erwe56");
       driver.findElement(By.xpath("/html/body/app-root/div/app-user-register/div/div/form/div[6]/button")).click();
     Thread.sleep(1000);
         
      
}
      
      
}