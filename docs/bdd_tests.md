# BDD Style Tests with Cucumber

## Add Cucumber Dependencies

- Ensure you have added the Cucumber dependencies in your `pom.xml` as mentioned earlier.

## Create Feature Files

1. **Create a Directory for Features**:
   - Create a directory `src/test/resources/features`.

2. **Create a Feature File**:
   - Create a file `product.feature` in the `features` directory:
     ```gherkin
     Feature: Manage Products

     Scenario: Get a product by ID
       Given the product with ID 1 exists
       When I request the product with ID 1
       Then the response should contain the product details

     Scenario: Update a product
       Given the product with ID 1 exists
       When I update the product with ID 1 with new details
       Then the product should be updated in the system

     Scenario: Delete a product
       Given the product with ID 1 exists
       When I delete the product with ID 1
       Then the product should be removed from the system
     ```

## Implement Step Definitions

1. **Create a Directory for Step Definitions**:
   - Create a directory `src/test/java/com/ganomkar/learners/steps`.

2. **Create a Step Definitions Class**:
   - Create a file `ProductSteps.java` in the `steps` directory:
     ```java
     @SpringBootTest
     @ContextConfiguration(classes = EcommerceApplication.class)
     @AutoConfigureMockMvc
     public class ProductSteps {
         @Autowired
         private MockMvc mockMvc;

         @Autowired
         private ProductRepository productRepository;

         private ResultActions resultActions;

         @Given("the product with ID {long} exists")
         public void theProductWithIDExists(Long id) {
             Product product = new Product();
             product.setId(id);
             product.setName("Test Product");
             product.setDescription("Test Description");
             product.setPrice(100.0);
             productRepository.save(product);
         }

         @When("I request the product with ID {long}")
         public void iRequestTheProductWithID(Long id) throws Exception {
             resultActions = mockMvc.perform(get("/products/" + id));
         }

         @Then("the response should contain the product details")
         public void theResponseShouldContainTheProductDetails() throws Exception {
             resultActions.andExpect(status().isOk())
                          .andExpect(jsonPath("$.name").value("Test Product"));
         }

         @When("I update the product with ID {long} with new details")
         public void iUpdateTheProductWithIDWithNewDetails(Long id) throws Exception {
             Product updatedProduct = new Product();
             updatedProduct.setId(id);
             updatedProduct.setName("Updated Product");
             updatedProduct.setDescription("Updated Description");
             updatedProduct.setPrice(150.0);
             String json

 = new ObjectMapper().writeValueAsString(updatedProduct);
             resultActions = mockMvc.perform(put("/products/" + id)
                                   .contentType(MediaType.APPLICATION_JSON)
                                   .content(json));
         }

         @Then("the product should be updated in the system")
         public void theProductShouldBeUpdatedInTheSystem() throws Exception {
             resultActions.andExpect(status().isOk())
                          .andExpect(jsonPath("$.name").value("Updated Product"));
         }

         @When("I delete the product with ID {long}")
         public void iDeleteTheProductWithID(Long id) throws Exception {
             resultActions = mockMvc.perform(delete("/products/" + id));
         }

         @Then("the product should be removed from the system")
         public void theProductShouldBeRemovedFromTheSystem() throws Exception {
             resultActions.andExpect(status().isNoContent());
         }
     }
     ```

## Create Test Runner

1. **Create a Directory for the Test Runner**:
   - Create a directory `src/test/java/com/ganomkar/learners`.

2. **Create a Test Runner Class**:
   - Create a file `CucumberTestRunner.java` in the `learners` directory:
     ```java
     @RunWith(Cucumber.class)
     @CucumberOptions(
         features = "src/test/resources/features",
         glue = "com.ganomkar.learners.steps",
         plugin = {"pretty", "html:target/cucumber-reports"}
     )
     public class CucumberTestRunner {
     }     

[Back to Table of Contents](index.md)