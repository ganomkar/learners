# Implementing Cache Operations

## Configure Cache

1. **Enable Caching in Spring Boot**:
   - Add `@EnableCaching` to your main application class:
     ```java
     @SpringBootApplication
     @EnableCaching
     public class EcommerceApplication {
         public static void main(String[] args) {
             SpringApplication.run(EcommerceApplication.class, args);
         }
     }
     ```

2. **Configure Cache**:
   - Add cache configuration in `application.properties`:
     ```properties
     spring.cache.type=simple
     ```

## Create Cache Service

1. **Create a `Product` Entity**:
   ```java
   @Entity
   public class Product {
       @Id
       @GeneratedValue(strategy = GenerationType.IDENTITY)
       private Long id;
       private String name;
       private String description;
       private double price;

       // getters and setters
   }
   ```

2. **Create a `ProductRepository` Interface**:
   ```java
   public interface ProductRepository extends JpaRepository<Product, Long> {
   }
   ```

3. **Create a `ProductService` Class**:
   ```java
   @Service
   public class ProductService {
       @Autowired
       private ProductRepository productRepository;

       @Cacheable(value = "products", key = "#id")
       public Product getProductById(Long id) {
           return productRepository.findById(id).orElse(null);
       }

       @CachePut(value = "products", key = "#product.id")
       public Product updateProduct(Product product) {
           return productRepository.save(product);
       }

       @CacheEvict(value = "products", key = "#id")
       public void deleteProduct(Long id) {
           productRepository.deleteById(id);
       }

       @CacheEvict(value = "products", allEntries = true)
       public void evictAllCacheValues() {
           // This will remove all entries from the cache
       }
   }
   ```

## Create REST Controller

1. **Create a `ProductController` Class**:
   ```java
   @RestController
   @RequestMapping("/products")
   public class ProductController {
       @Autowired
       private ProductService productService;

       @GetMapping("/{id}")
       public ResponseEntity<Product> getProduct(@PathVariable Long id) {
           Product product = productService.getProductById(id);
           return product != null ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
       }

       @PutMapping("/{id}")
       public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
           product.setId(id);
           Product updatedProduct = productService.updateProduct(product);
           return ResponseEntity.ok(updatedProduct);
       }

       @DeleteMapping("/{id}")
       public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
           productService.deleteProduct(id);
           return ResponseEntity.noContent().build();
       }
   }

[Back to Table of Contents](index.md)