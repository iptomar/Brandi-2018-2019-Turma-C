/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import static org.junit.Assert.fail;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 *
 * @author LittleChinese
 */
public class Sobre {
    
WebDriver driver;

   @Test
     public void Sobre() throws Exception{
             driver = new ChromeDriver();
           driver.get("http://localhost:8080/#/");
       //  driver.get("http://brandic.devll.eu:61080/");
         driver.findElement(By.xpath("//*[@id=\"navbar\"]/button")).click();
         Thread.sleep(1000);
  
         driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/a")).click();
            Thread.sleep(1000);
            
            driver.findElement(By.name("email")).sendKeys("admin@admin.admin"); 
            driver.findElement(By.name("password")).sendKeys("admin");
   
         driver.findElement(By.xpath("/html/body/app-root/div/app-login/div/div/form/button")).click();       
           Thread.sleep(1000);
       
           driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[4]/a")).click();
           Thread.sleep(1000);
           
       WebElement msg = driver.findElement(By.xpath("/html/body/app-root/div/app-about/div/div"));
         if (!msg.isDisplayed())
         fail("not save");
           
}
    
}
