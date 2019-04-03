/*
 * To change this license header, choose License Headers in Project Properties. To change this
 * template file, choose Tools | Templates and open the template in the editor.
 */

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.chrome.ChromeDriver;


/**
 *
 * @author LittleChinese
 */
public class Teste_Signin {
  static WebDriver driver = new ChromeDriver();

  @BeforeClass
  public static void setUpBeforeClass() throws Exception {
    driver.get("http://brandic.devll.eu:61080/login/login");
    WebElement email = driver.findElement(By.id("email"));
    email.sendKeys("admin@admin.admin");
    WebElement pass = driver.findElement(By.id("password"));
    pass.sendKeys("admin");
    driver.findElement(By.id("butLogin")).click();
  }


  @AfterClass
  public static void tearDownAfterClass() throws Exception {
    //driver.close();
  }

  @Test
  public void testAllFields() throws Exception {
    driver.get("http://brandic.devll.eu:61080/signup/signup");
    WebElement curElement = driver.findElement(By.id("email"));
    curElement.clear();
    curElement.sendKeys("hurukpt@gmail.com");
    curElement = driver.findElement(By.id("password"));
    curElement.clear();
    curElement.sendKeys("123456");
    curElement = driver.findElement(By.id("fullname"));
    curElement.clear();
    curElement.sendKeys("Luis Carlos Gaspar Gomes");
    curElement = driver.findElement(By.id("address"));
    curElement.clear();
    curElement.sendKeys("Ali mesmo");
    curElement = driver.findElement(By.id("dateCamp"));
    curElement.clear();
    curElement.sendKeys("11271991");
    curElement = driver.findElement(By.id("cellphone"));
    curElement.clear();
    curElement.sendKeys("912198517");
    Select userType = new Select(driver.findElement(By.id("usertypeid")));
    userType.selectByVisibleText("Admin");
    curElement = driver.findElement(By.id("register"));
    curElement.click();
  }
}
