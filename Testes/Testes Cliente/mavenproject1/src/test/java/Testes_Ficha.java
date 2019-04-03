import static org.junit.Assert.*;
import java.sql.Driver;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Testes_Ficha {

  @BeforeClass
  public static void setUpBeforeClass() throws Exception {
    WebDriver driver = new ChromeDriver();
    driver.get("http://brandic.devll.eu:61080/login/login");
    WebElement email = driver.findElement(By.id("email"));
    email.sendKeys("admin@admin.admin");
    WebElement pass = driver.findElement(By.id("password"));
    pass.sendKeys("admin");
    driver.findElement(By.id("butLogin")).click();
  }

  @AfterClass
  public static void tearDownAfterClass() throws Exception {}

  @Before
  public void setUp() throws Exception {}

  @After
  public void tearDown() throws Exception {}

  @Test
  public void test() {
    WebDriver driver = new ChromeDriver();
    driver.get("http://brandic.devll.eu:61080/ficha/ficha");
    WebElement designation = driver.findElement(By.id("designation"));
    designation.sendKeys("a tua mãe de 4");
  }

}
