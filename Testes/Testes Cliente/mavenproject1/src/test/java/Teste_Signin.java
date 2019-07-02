/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 *
 * @author LittleChinese
 */


public class Teste_Signin {
    
    
    @BeforeClass
  public static void setUpBeforeClass() throws Exception {
    WebDriver driver = new ChromeDriver();
    driver.get("http://brandic.devll.eu:61080/login/login");
    WebElement email = driver.findElement(By.id("email"));
    email.sendKeys("admin@admin.admin");
    WebElement pass = driver.findElement(By.id("password"));
    pass.sendKeys("admin");
    driver.findElement(By.id("butLogin")).click();
    
   // driver.close();
  }
/*
  @Test
  public static void signUp() throws Exception{
      WebDriver driver = new ChromeDriver();
      driver.get("http://brandic.devll.eu:61080/index");
             driver.findElement(By.id("signupBut")).click();
 
     //Thread.sleep(3000);
   
      
  }
    

    */
    
      @Test
    public void testSimple() throws Exception {
WebDriver driver = new ChromeDriver();


        driver.get("http://brandic.devll.eu:61080/signup/signup");
     
        /*JAVASCRIPT   
          JavascriptExecutor js = (JavascriptExecutor)driver;
          
          js.executeScript("alert(2+2);");
      */
        
       WebElement email = driver.findElement(By.id("email")); //.sendKeys("teste123456@ipt.pt");
     email.clear();
       email.sendKeys("teste123456@ipt.pt");
     
      
               WebElement fullname = driver.findElement(By.id("fullname"));
        fullname.clear();
        fullname.sendKeys("Manuel Mircolino dos Santos");
        
       
       WebElement password = driver.findElement(By.id(("password")));
       password.clear();
      password.sendKeys("WebElem");
      

          WebElement data = driver.findElement(By.id("dateCamp"));
          data.clear();
          data.sendKeys("10102000");
          
          WebElement address = driver.findElement(By.id("address"));
          address.clear();
          address.sendKeys("No Coracao de todo o verdadeiro portugues");
          
          WebElement cellphone = driver.findElement(By.id("cellphone"));
          cellphone.clear();
          cellphone.sendKeys("912312321");
          
          
           
            driver.findElement(By.id("usertypeid")).click();
            Thread.sleep(1000);
            data.sendKeys("a");
            
            driver.findElement(By.id("cellphone")).click();
           Thread.sleep(1000);
           
          driver.findElement(By.id("registar")).click();
          
    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    // @Test
    // public void hello() {}
}
}