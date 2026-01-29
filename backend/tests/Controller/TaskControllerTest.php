<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class TaskControllerTest extends WebTestCase
{
    public function testCreateTask(): void
    {
        $client = static::createClient();
        $client->request('POST', '/api/tasks', [], [], ['CONTENT_TYPE' => 'application/json'], json_encode([
            'title' => 'Test Task',
            'status' => 'pending'
        ]));

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains(['title' => 'Test Task']);
    }

    public function testListTasks(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/tasks');

        $this->assertResponseIsSuccessful();
        $this->assertJson($client->getResponse()->getContent());
    }
}
