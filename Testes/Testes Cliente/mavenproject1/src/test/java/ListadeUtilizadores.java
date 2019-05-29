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
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 *
 * @author LittleChinese
 */
public class ListadeUtilizadores {
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
      public void admin_ListaUtilizadores() throws Exception {
          driver.get("http://brandic.devll.eu:61080/");
          driver.findElement(By.xpath("//*[@id=\"navbar\"]/button/span")).click();
        Thread.sleep(1000);
        driver.findElement(By.id("navbarDropdownAdmin")).click();
       Thread.sleep(1000);
       driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[3]/div/a[1]")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/app-root/div/app-user-list/div/div/form/div[2]/table/tbody/tr[4]/td[5]/div/button[1]")).click();
         Thread.sleep(1000);
         WebElement name = driver.findElement(By.name("full_name"));
         name.clear();
         name.sendKeys("Marcio");
         WebElement morada = driver.findElement(By.name("address"));
         morada.clear();
         morada.sendKeys("Rua das padeiras");
         WebElement Birthday = driver.findElement(By.name("birthday"));
          Birthday.clear();
          Birthday.sendKeys("02121992");
           WebElement cell = driver.findElement(By.name("cellphone"));
           cell.clear();
           cell.sendKeys("987654321");     
         WebElement qualifications = driver.findElement(By.name("qualifications"));
           qualifications.clear();
            qualifications.sendKeys("sim");
            WebElement Title = driver.findElement(By.name("title"));
            Title.clear();
            Title.sendKeys("Eng");
         Select Util = new Select(driver.findElement(By.name("id_type_user")));
         Util.selectByValue("2");
         driver.findElement(By.xpath("/html/body/app-root/div/app-user-list/div/div/form/div[8]/div/button[1]")).click();
         Thread.sleep(1000);
         
        
      }
      @After
      public void admin_ListaUtilizadores_Procurar() throws Exception {
          driver.get("http://brandic.devll.eu:61080/");
          driver.findElement(By.xpath("//*[@id=\"navbar\"]/button/span")).click();
        Thread.sleep(1000);
        driver.findElement(By.id("navbarDropdownAdmin")).click();
       Thread.sleep(1000);
       driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[3]/div/a[1]")).click();
        Thread.sleep(1000);
        driver.findElement(By.name("searchBox")).sendKeys("marcio");
        driver.findElement(By.xpath("/html/body/app-root/div/app-user-list/div/div/form/div[1]/div/button")).click();
        Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/app-root/div/app-user-list/div/div/form/div[2]/table/tbody/tr[1]/td[5]/div/button[1]")).click();
        Thread.sleep(1000);
       
        WebElement quali = driver.findElement(By.name("qualifications"));
         quali.clear();
         quali.sendKeys("12");
         
        WebElement title = driver.findElement(By.name("title"));
        title.clear();
        title.sendKeys("Técnico");
        
        driver.findElement(By.xpath("/html/body/app-root/div/app-user-list/div/div/form/div[8]/div/button[1]")).click();
        Thread.sleep(1000);
      }
      
}
