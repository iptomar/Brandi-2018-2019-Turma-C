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
    
    driver.close();
  }

    

    
    
      @Test
    public void testSimple() throws Exception {
WebDriver driver = new ChromeDriver();


        driver.get("http://brandic.devll.eu:61080/signin/signin");
     
        /*JAVASCRIPT   
          JavascriptExecutor js = (JavascriptExecutor)driver;
          
          js.executeScript("alert(2+2);");
      */
        
       WebElement email = driver.findElement(By.id("email")); //.sendKeys("teste123456@ipt.pt");
     email.clear();
       email.sendKeys("teste123456@ipt.pt");
       
       WebElement password = driver.findElement(By.id(("password")));
       password.clear();
      password.sendKeys("123456");
      
        WebElement fullname = driver.findElement(By.id("fullname"));
        fullname.clear();
        fullname.sendKeys("Manuel Mircolino dos Santos");
        
          WebElement data = driver.findElement(By.id("dateCamp"));
          data.sendKeys("10102000");
          
          
          
    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    // @Test
    // public void hello() {}
}
}